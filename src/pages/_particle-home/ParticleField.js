import {useEffect, useRef} from 'react';

const IMAGE_PATTERN = /^(?:data:image\/|https?:\/\/|\/|\.\/|\.\.\/)|\.(?:png|jpe?g|webp|gif|svg)(?:[?#].*)?$/i;

function resolveSourceType(sourceType, content) {
  if (sourceType !== 'auto') return sourceType;
  return content.trim().startsWith('<svg') || IMAGE_PATTERN.test(content) ? 'image' : 'text';
}

function resolveImageSource(content) {
  return content.trim().startsWith('<svg')
    ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(content)}`
    : content;
}

function mixHexColors(startColor, endColor, amount) {
  const parse = (value) => {
    const hex = value.replace('#', '');
    const normalized = hex.length === 3 ? hex.split('').map((part) => part + part).join('') : hex;
    return [0, 2, 4].map((offset) => Number.parseInt(normalized.slice(offset, offset + 2), 16));
  };
  const start = parse(startColor);
  const end = parse(endColor);
  return `rgb(${start.map((channel, index) => Math.round(channel + (end[index] - channel) * amount)).join(',')})`;
}

export default function ParticleField({
  content,
  sourceType = 'auto',
  particleSize = 2,
  density = 4,
  color = '#fff',
  highlightColor = '#5bc0eb',
  scatter = 130,
  gatherDuration = 1600,
  stagger = 420,
  pointerRepel = 40,
  repelRadius = 120,
  idleDrift = 0.7,
  trigger = 'mount',
  fontSize = 'clamp(3rem, 12vw, 8rem)',
  fontWeight = 800,
  fontFamily = 'inherit',
  glow = true,
  className = '',
  style,
  imageScale = 0.72,
  alphaThreshold = 80,
  useImageColors = true,
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !content) return undefined;

    const pointer = {x: -9999, y: -9999};
    const resolvedType = resolveSourceType(sourceType, content);
    let particles = [];
    let animationFrame;
    let width = 0;
    let height = 0;
    let formationStartedAt = performance.now();
    let disposed = false;

    const getFont = () => {
      const probe = document.createElement('span');
      probe.style.cssText = `position:absolute;visibility:hidden;font-size:${fontSize};font-family:${fontFamily};font-weight:${fontWeight}`;
      probe.textContent = 'M';
      wrapperRef.current.appendChild(probe);
      const computed = getComputedStyle(probe);
      const font = `${fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
      probe.remove();
      return font;
    };

    const buildParticles = (sourceContext) => {
      let pixels;
      try {
        pixels = sourceContext.getImageData(0, 0, width, height).data;
      } catch (error) {
        console.error('粒子图片无法读取像素。远程图片服务器需要允许 CORS。', error);
        return;
      }
      const nextParticles = [];
      for (let y = 0; y < height; y += density) {
        for (let x = 0; x < width; x += density) {
          const index = (y * width + x) * 4;
          if (pixels[index + 3] < alphaThreshold) continue;
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * scatter;
          nextParticles.push({
            x: x + Math.cos(angle) * distance,
            y: y + Math.sin(angle) * distance,
            originX: x,
            originY: y,
            velocityX: 0,
            velocityY: 0,
            delay: Math.random() * stagger,
            phase: Math.random() * Math.PI * 2,
            color: resolvedType === 'image' && useImageColors
              ? `rgb(${pixels[index]},${pixels[index + 1]},${pixels[index + 2]})`
              : mixHexColors(color, highlightColor, x / Math.max(width, 1)),
          });
        }
      }
      particles = nextParticles;
      formationStartedAt = performance.now();
    };

    const renderSource = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(canvas.clientWidth));
      height = Math.max(1, Math.round(canvas.clientHeight));
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const sourceCanvas = document.createElement('canvas');
      sourceCanvas.width = width;
      sourceCanvas.height = height;
      const sourceContext = sourceCanvas.getContext('2d');

      if (resolvedType === 'image') {
        const image = new Image();
        if (/^https?:\/\//i.test(content)) image.crossOrigin = 'anonymous';
        image.onload = () => {
          if (disposed) return;
          const scale = Math.min(width * imageScale / image.naturalWidth, height * imageScale / image.naturalHeight);
          const imageWidth = image.naturalWidth * scale;
          const imageHeight = image.naturalHeight * scale;
          sourceContext.drawImage(image, (width - imageWidth) / 2, (height - imageHeight) / 2, imageWidth, imageHeight);
          buildParticles(sourceContext);
        };
        image.onerror = () => console.error(`粒子图片加载失败：${content}`);
        image.src = resolveImageSource(content);
      } else {
        sourceContext.fillStyle = '#fff';
        sourceContext.font = getFont();
        sourceContext.textAlign = 'center';
        sourceContext.textBaseline = 'middle';
        sourceContext.fillText(content, width / 2, height / 2);
        buildParticles(sourceContext);
      }
    };

    const scatterAndRegather = () => {
      for (const particle of particles) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * scatter;
        particle.x = particle.originX + Math.cos(angle) * distance;
        particle.y = particle.originY + Math.sin(angle) * distance;
        particle.delay = Math.random() * stagger;
      }
      formationStartedAt = performance.now();
    };

    const animate = (time) => {
      context.clearRect(0, 0, width, height);
      const elapsed = time - formationStartedAt;
      for (const particle of particles) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const pointerDistance = Math.hypot(dx, dy) || 1;
        if (pointerDistance < repelRadius) {
          const force = (repelRadius - pointerDistance) / repelRadius;
          particle.velocityX += (dx / pointerDistance) * force * pointerRepel * 0.08;
          particle.velocityY += (dy / pointerDistance) * force * pointerRepel * 0.08;
        }
        const progress = Math.max(0, Math.min(1, (elapsed - particle.delay) / Math.max(gatherDuration, 1)));
        const attraction = 0.012 + progress * 0.055;
        particle.velocityX += (particle.originX - particle.x) * attraction;
        particle.velocityY += (particle.originY - particle.y) * attraction;
        particle.velocityX += Math.sin(time / 1200 + particle.phase) * idleDrift * 0.035;
        particle.velocityY += Math.cos(time / 1100 + particle.phase) * idleDrift * 0.035;
        particle.velocityX *= 0.82;
        particle.velocityY *= 0.82;
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        context.fillStyle = particle.color;
        context.shadowColor = glow ? highlightColor : 'transparent';
        context.shadowBlur = glow ? particleSize * 2.5 : 0;
        context.beginPath();
        context.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
        context.fill();
      }
      context.shadowBlur = 0;
      animationFrame = requestAnimationFrame(animate);
    };

    const movePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const clearPointer = () => { pointer.x = -9999; pointer.y = -9999; };
    const replayOnClick = () => trigger === 'click' && scatterAndRegather();
    const replayOnHover = () => trigger === 'hover' && scatterAndRegather();

    renderSource();
    const resizeObserver = new ResizeObserver(renderSource);
    resizeObserver.observe(canvas);
    canvas.addEventListener('pointermove', movePointer);
    canvas.addEventListener('pointerleave', clearPointer);
    canvas.addEventListener('click', replayOnClick);
    canvas.addEventListener('pointerenter', replayOnHover);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', movePointer);
      canvas.removeEventListener('pointerleave', clearPointer);
      canvas.removeEventListener('click', replayOnClick);
      canvas.removeEventListener('pointerenter', replayOnHover);
    };
  }, [alphaThreshold, color, content, density, fontFamily, fontSize, fontWeight, gatherDuration, glow, highlightColor, idleDrift, imageScale, particleSize, pointerRepel, repelRadius, scatter, sourceType, stagger, trigger, useImageColors]);

  return (
    <div ref={wrapperRef} className={`particleField ${className}`.trim()} style={style}>
      <canvas ref={canvasRef} className="particleField__canvas" aria-label={content} role="img" />
    </div>
  );
}

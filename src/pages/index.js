import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ParticleField from './_particle-home/ParticleField';
import './_particle-home/particle-home.css';

// ======================== 粒子内容与动画参数 ========================
// 之后主要修改这里即可，下面每个参数都对应粒子组件的一项能力。
const PARTICLE_CONFIG = {
  // 内容类型：'text' 文字；'image' PNG/SVG/图片链接；'auto' 自动判断。
  sourceType: 'image',

  // 显示内容：文字模式填写文字；图片模式填写本地路径、远程 URL 或 SVG 源码。
  // 本地 PNG：'/img/logo.png'    本地 SVG：'/img/logo.svg'
  // 远程图片：'https://example.com/logo.png'    SVG 源码：'<svg ...>...</svg>'
  content: '/img/atsea-bg.svg',

  // 单个粒子的半径（CSS 像素）；越大粒子越粗。
  particleSize: 1.6,

  // 离屏画布的采样间隔；越小粒子越密集，同时性能消耗越高。
  density: 5,

  // 粒子主颜色；文字模式使用，图片关闭原色时也使用。
  color: '#252525',

  // 粒子高亮颜色，用于渐变和发光。
  highlightColor: '#272727',

  // 粒子初始散开的最大距离（像素）。
  scatter: 50,

  // 粒子聚合成内容所需时间（毫秒）。
  gatherDuration: 1600,

  // 每个粒子开始聚合前的最大随机延迟（毫秒）。
  stagger: 420,

  // 鼠标推开粒子的力度；数值越大排斥越明显。
  pointerRepel: 50,

  // 鼠标影响半径（像素）。
  repelRadius: 160,

  // 内容形成后的轻微漂移幅度；设为 0 可静止。
  idleDrift: 0.5,

  // 动画重播方式：'mount' 仅首次；'hover' 悬停；'click' 点击。
  trigger: 'mount',

  // 文字字号，支持 CSS 字号表达式或固定值，例如 '120px'。
  fontSize: 'clamp(5rem, 14vw, 11rem)',

  // 文字粗细。
  fontWeight: 900,

  // 字体族；inherit 表示继承站点字体。
  fontFamily: 'inherit',

  // 是否给粒子增加柔和发光。
  glow: false,

  // 可选的额外容器类名。
  className: '',

  // 可选 React 行内样式，例如 {opacity: 0.9}；不需要时为 undefined。
  style: undefined,

  // 图片占画布的比例；仅 PNG/SVG/图片链接模式生效。
  imageScale: 0.7,

  // 图片透明度阈值（0～255）；越高，透明区域过滤越多。
  alphaThreshold: 200,

  // 图片模式是否保留原本像素颜色；false 时使用上面的粒子颜色。
  useImageColors: true,
};

// ======================== 首页布局与主题参数 ========================
// 这些变量集中控制独立 CSS，无需打开 CSS 文件修改常用参数。
const HERO_STYLE = {
  // 首页主体最小高度：减去导航栏后占满一屏。
  '--particle-hero-min-height': 'calc(80vh - var(--ifm-navbar-height))',
  // 浅色模式背景。
  '--particle-hero-light-background': '#ffffff',
  // 深色模式背景。
  '--particle-hero-dark-background': '#0f1115',
  // 粒子区域最大宽度。
  '--particle-hero-content-width': 'min(1500px, 100%)',
  // 桌面端内边距。
  '--particle-hero-padding': '2rem',
  // 移动端内边距。
  '--particle-hero-mobile-padding': '1rem',
  // 桌面端粒子画布高度。
  '--particle-canvas-height': 'clamp(280px, 50vw, 560px)',
  // 移动端粒子画布高度。
  '--particle-canvas-mobile-height': '280px',
};

function HomepageHeader() {
  return (
    <header className="particleHero" style={HERO_STYLE}>
      <div className="particleHero__content">
        <ParticleField {...PARTICLE_CONFIG} />
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={` ${siteConfig.title}`} description="布丁不能吃的个人文档站">
      <HomepageHeader />
    </Layout>
  );
}

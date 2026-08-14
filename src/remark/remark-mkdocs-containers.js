import {fromMarkdown} from 'mdast-util-from-markdown';
import {gfm} from 'micromark-extension-gfm';
import {gfmFromMarkdown} from 'mdast-util-gfm';

const TAB_PATTERN = /^===\s+(["'])(.*?)\1\s*$/;
const ICON_PATTERN = /^:([^:]+):\s*(.*)$/;

function paragraphText(node) {
  if (node?.type !== 'paragraph' || node.children?.length !== 1) return null;
  return node.children[0].type === 'text' ? node.children[0].value : null;
}

function parseMarkdown(value) {
  return fromMarkdown(value, {
    extensions: [gfm()],
    mdastExtensions: [gfmFromMarkdown()],
  }).children;
}

function parseTabLabel(rawLabel) {
  const match = ICON_PATTERN.exec(rawLabel.trim());
  return match
    ? {icon: match[1], label: match[2] || match[1]}
    : {icon: '', label: rawLabel.trim()};
}

function slugify(value, index) {
  const slug = value
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
  return slug || `tab-${index + 1}`;
}

function attribute(name, value) {
  return {type: 'mdxJsxAttribute', name, value};
}

function component(name, attributes, children) {
  return {type: 'mdxJsxFlowElement', name, attributes, children};
}

function contentAfterMarker(children, markerIndex) {
  const marker = children[markerIndex];
  const next = children[markerIndex + 1];

  // A second parser pass represents a four-space block as one code node.
  if (next?.type === 'code' && !next.lang) {
    const nodes = parseMarkdown(next.value);
    transformChildren(nodes);
    return {nodes, consumed: 2};
  }

  // Docusaurus expands indented Markdown into normal nodes while retaining
  // their original source column. Everything further indented belongs here.
  const markerColumn = marker?.position?.start?.column ?? 1;
  const nodes = [];
  let cursor = markerIndex + 1;

  while (cursor < children.length) {
    const column = children[cursor]?.position?.start?.column;
    if (!Number.isFinite(column) || column <= markerColumn) break;
    nodes.push(children[cursor]);
    cursor += 1;
  }

  transformChildren(nodes);
  return {nodes, consumed: cursor - markerIndex};
}

function transformChildren(children) {
  const output = [];

  for (let index = 0; index < children.length;) {
    const text = paragraphText(children[index]);
    const tabMatch = text && TAB_PATTERN.exec(text);

    if (tabMatch) {
      const tabNodes = [];
      let cursor = index;
      let tabIndex = 0;

      while (cursor < children.length) {
        const currentText = paragraphText(children[cursor]);
        const currentMatch = currentText && TAB_PATTERN.exec(currentText);
        if (!currentMatch) break;

        const {icon, label} = parseTabLabel(currentMatch[2]);
        const content = contentAfterMarker(children, cursor);
        const attributes = [
          attribute('value', `${slugify(label, tabIndex)}-${tabIndex}`),
          attribute('label', label),
          attribute('icon', icon),
        ];
        if (tabIndex === 0) attributes.push(attribute('default', null));

        tabNodes.push(component('MarkdownTab', attributes, content.nodes));
        cursor += content.consumed;
        tabIndex += 1;
      }

      output.push(component('MarkdownTabs', [], tabNodes));
      index = cursor;
      continue;
    }

    const node = children[index];
    if (Array.isArray(node.children)) transformChildren(node.children);
    output.push(node);
    index += 1;
  }

  children.splice(0, children.length, ...output);
}

export default function remarkMkdocsContainers() {
  return (tree) => {
    transformChildren(tree.children);
  };
}

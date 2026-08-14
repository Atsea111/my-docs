import {Children, isValidElement} from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from './styles.module.css';

const ICON_ALIASES = {
  'mac-finder': 'iconfont icon-a-fangda_mac-finder1',
  'icon-a-fangda_mac-finder': 'iconfont icon-a-fangda_mac-finder1',
  'fa-windows': 'fa-brands fa-windows',
  'fa-linux': 'fa-brands fa-linux',
  'fa-apple': 'fa-brands fa-apple',
  'fa-github': 'fa-brands fa-github',
  'material-microsoft-windows': 'fa-brands fa-windows',
  'material-microsoft': 'fa-brands fa-windows',
  'material-apple': 'fa-brands fa-apple',
  'material-microsoft-mac': 'fa-brands fa-apple',
  'material-linux': 'fa-brands fa-linux',
  'material-android': 'fa-brands fa-android',
  'material-github': 'fa-brands fa-github',
};

function resolveIconClassName(icon) {
  if (!icon) return '';
  if (ICON_ALIASES[icon]) return ICON_ALIASES[icon];
  if (icon.startsWith('icon-')) return 'iconfont ' + icon;
  return icon;
}

function TabLabel({icon, label}) {
  const iconClassName = resolveIconClassName(icon);

  return (
    <span className={styles.label}>
      {iconClassName && <i className={iconClassName} aria-hidden="true" />}
      <span>{label}</span>
    </span>
  );
}

export default function MarkdownTabs({children}) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div className={styles.tabs}>
      <Tabs>
        {items.map((item, index) => {
          const {
            value,
            label,
            icon,
            default: defaultActive,
            children: content,
          } = item.props;

          return (
            <TabItem
              key={value || index}
              value={value || `tab-${index + 1}`}
              label={<TabLabel icon={icon} label={label} />}
              default={defaultActive}>
              {content}
            </TabItem>
          );
        })}
      </Tabs>
    </div>
  );
}

// 这个组件只作为 Markdown 解析器传递标签数据的标记。
export function MarkdownTab({children}) {
  return children;
}

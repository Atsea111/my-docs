# 独立组件目录

每个组件目录必须使用 `component-xxx` 命名，并固定包含 `manifest.js`。
其他文件名称和目录结构由 manifest 自己声明，例如：

```js
export default {
  id: 'component-back-to-top',
  name: '返回顶部',
  type: 'component',
  position: 'after',
  order: 100,
  files: {
    component: './任意入口.js',
    styles: ['./任意样式.css'],
    clientModules: ['./可选浏览器模块.js'],
  },
};
```

组件需要在 `themes/theme-atsea.config.js` 的 `components` 中使用布尔值开启。

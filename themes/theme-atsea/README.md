# theme-atsea

在 `docusaurus.config.js` 顶层通过下面一行启用：

```js
themes: ['./themes/theme-atsea/index.js'],
```

主题管理器启动时会自动扫描：

- `themes/theme-*/manifest.js`
- `components/component-*/manifest.js`

只有 `manifest.js` 文件名固定。其他入口、样式、客户端模块可以任意命名，
也可以放进子目录，但必须在对应 manifest 的 `files` 中声明。

主题示例：

```js
export default {
  id: 'theme-footer-2',
  name: 'Footer 2',
  type: 'theme',
  files: {
    header: './任意页头.js',
    navbar: './layout/任意导航.js',
    main: './任意中间区域.js',
    footer: './Footer.js',
    styles: ['./theme.css', './colors.css'],
    clientModules: ['./browser.js'],
  },
};
```

`header`、`navbar`、`main`、`footer` 都是可选角色；没有声明的区域继续使用
Docusaurus 原版。未在 manifest 声明、也没有被入口文件 import 的辅助文件不会加载。

切换主题和开关组件只编辑 `../theme-atsea.config.js`。新增或修改 manifest 后需要
重启 Docusaurus 开发服务器，让扫描器重新识别。

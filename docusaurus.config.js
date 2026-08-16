// @ts-check
// `@type` JSDoc 注释可让编辑器提供自动补全和类型检查
// （需配合 `@ts-check` 使用）。
// 声明 Docusaurus 配置有多种等效方式。
// 参见：https://docusaurus.io/docs/api/docusaurus-config
//source ~/.bashrc
//nvm -v
//npm run start -- --host 0.0.0.0
//npm --prefix my-website run start -- --host 0.0.0.0
//nvm install 22
//nvm alias default 22
//apt install nodejs npm
//source ~/.nvm/nvm.sh


import { themes as prismThemes } from 'prism-react-renderer';
import remarkMkdocsContainers from './src/remark/remark-mkdocs-containers.js';

// 此代码在 Node.js 中运行——请勿在此使用客户端代码（浏览器 API、JSX 等）。

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '布丁不能吃',
  tagline: 'Dinosaurs are cool',
  favicon: '/img/atsea-bg.svg',

  // 未来特性开关，参见 https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // 提升与即将发布的 Docusaurus v4 的兼容性
  },

  // 在此设置你的网站生产环境 URL
  url: 'https://atsea.top',
  // 设置网站部署在其下的 /<baseUrl>/ 路径名
  // 对于 GitHub Pages 部署，通常为 '/<projectName>/'
  baseUrl: '/',

  // GitHub Pages 部署配置。
  // 若不使用 GitHub Pages，则无需填写这些项。
  organizationName: 'atsea111', // 通常为你的 GitHub 组织或用户名。
  projectName: 'my-docs', // 通常为你的仓库名称。

  onBrokenLinks: 'throw',

  // Atsea 主题管理器：具体主题与组件在 themes/theme-atsea.config.js 中选择。
  themes: ['./themes/theme-atsea/index.js'],

  // 即使不使用国际化，也可通过此字段设置
  // HTML 语言等有用元数据。例如，若网站为中文，
  // 可将 “en” 替换为 “zh-Hans”。
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          remarkPlugins: [remarkMkdocsContainers],
          showLastUpdateAuthor: false,
          // 可选：同时显示更新时间
          showLastUpdateTime: false,
          sidebarCollapsed: false,
          // 请将此地址改为你的仓库。
          // 删除此项即可移除“编辑此页面”链接。
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          remarkPlugins: [remarkMkdocsContainers],
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // 请将此地址改为你的仓库。
          // 删除此项即可移除“编辑此页面”链接。
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // 用于确保博客遵循最佳实践的实用选项
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  //导航栏
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 替换为你项目的社交分享卡片。
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },

      // 顶部公告栏
      announcementBar: {
        id: 'gang ',
        content:
          //'⭐ 如果本站内容对你有帮助，可以前往 <a target="_blank" rel="noopener noreferrer" href="https://github.com/Atsea111/my-docs">GitHub</a> 点个 Star 支持一下！',
          '<b>🎉️ 本站新上线啦！🥳️测试阶段如有BUG见谅，也可以联系我、感谢！！</b>',
        backgroundColor: '#ffffff',
        textColor: '#091e42',
        isCloseable: true,    //公告栏关闭按钮/开关
      },

      navbar: {
        title: '布丁不能吃',
        logo: {
          alt: 'My Site Logo',
          src: '/img/atsea-bg.svg',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Docs',
          // },
          {
            label: 'Docs',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'CalshSidebar',
                label: '订阅推荐',
                to: '/docs/Calsh/订阅推荐',
              },
              // {
              //   label: '文档（制作中）',
              //   to: '/docs/Docusaurus/intro',
              // },
              // {
              //   label: 'Docker',
              //   to: '/docs/docker',
              // },
              // {
              //   label: 'AI',
              //   to: '/docs/ai',
              // },
              // {
              //   label: 'NAS',
              //   to: '/docs/nas',
              // },
            ],
          },
          // { to: '/blog', label: 'Blog', position: 'left' },
          { to: '/docs/Clash/订阅推荐', label: '订阅推荐', position: 'right' },

          //导航栏右上角Github图标
          // {
          //   href: 'https://github.com/facebook/docusaurus',
          //   html: '<i class="fa-brands fa-github fa-xl"></i>',
          //   //label: 'GitHub',
          //   position: 'right',
          // },

          //多语言下拉栏 要配置i18n
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
        ],
      },
      //颜色模式
      // colorMode: {
      //   defaultMode: "dark",
      //   disableSwitch: true,
      // }


      //底部栏
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: '订阅推荐',
                to: '/docs/Clash/订阅推荐',
              },
              {
                label: 'Openlist',
                to: 'https://list.atsea.top/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              // {
              //   label: 'GitHub',
              //   href: 'https://github.com/facebook/docusaurus',
              // },
            ],
          },
          {
            title: 'Community',
            items: [
              // {
              //   label: 'Stack Overflow',
              //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              // },
              // {
              //   label: 'Discord',
              //   href: 'https://discordapp.com/invite/docusaurus',
              // },
              // {
              //   label: 'X',
              //   href: 'https://x.com/docusaurus',
              // },
            ],
          },
        ],
        copyright: `Copyright <i class="fa-solid fa-copyright"></i> ${new Date().getFullYear()} .ALL RIGHTS RESERVED 布丁不能吃  . <a class="iconfont icon-docusaurus" target="_blank" href="https://docusaurus.io/zh-CN/"></a>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

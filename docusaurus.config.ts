import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Microbe Studio Docs',
  tagline: 'Built for serious automation',
  favicon: 'img/favicon.ico',

  url: 'https://docs.microbe-studio.com',
  baseUrl: '/',
  organizationName: 'microbe-studio',
  projectName: 'microbe-studio-docs',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi', 'zh-Hans'],
    localeConfigs: {
      en: {label: 'English'},
      vi: {label: 'Tiếng Việt'},
      'zh-Hans': {label: '简体中文'},
    },
  },

  scripts: [
    {
      src: '/js/locale-redirect.js',
      defer: true,
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en', 'zh'],
        docsRouteBasePath: '/',
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarPosition: 'right',
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        searchBarShortcutKeymap: 'mod+k',
        searchResultLimits: 10,
        searchResultContextMaxLength: 90,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Microbe Studio',
      logo: {
        alt: 'Microbe Studio',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting Started', to: '/getting-started/installation'},
            {label: 'Setup MuMu', to: '/getting-started/setup-mumu'},
            {label: 'Build Flows', to: '/building-flows/overview'},
          ],
        },
        {
          title: 'Product',
          items: [
            {label: 'Instance Dashboard', to: '/using-the-app/instance-dashboard'},
            {label: 'Discord Bot', to: '/using-the-app/discord-bot'},
          ],
        },
        {
          title: 'Legal',
          items: [
            {label: 'Terms of Service', href: 'https://microbe-studio.com/terms'},
            {label: 'Privacy Policy', href: 'https://microbe-studio.com/privacy'},
            {label: 'Refund Policy', href: 'https://microbe-studio.com/refund'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Microbe Studio.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

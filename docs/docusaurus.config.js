// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VibeCheck',
  tagline: 'Understand Emotions, Improve Interactions.',
  favicon: 'img/logo.png',

  // Set the production url of your site here
  // url: 'https://vibecheck.ouariachi.com',
  url: "http://localhost:3000",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ouariachi', // Usually your GitHub org/user name.
  projectName: 'vibecheck', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'VibeCheck',
        logo: {
          alt: 'VibeCheck Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docSideBar',
            position: 'left',
            label: 'Documentation',
          },
          // { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/ouariachi/vibecheck',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'API REST',
                to: '/docs/API REST',
              },
              {
                label: 'Components',
                to: '/docs/components',
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://es.stackoverflow.com/users/255892/ouariachi',
              },
              {
                label: 'Github',
                href: 'https://github.com/ouariachi',
              },
              {
                label: 'Website',
                href: 'https://ouariachi.com',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/mohaa_m_o',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ouariachi/vibecheck',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mohamed Mohamed el Ouarichi. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

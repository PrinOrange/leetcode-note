import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes } from "prism-react-renderer";
import katex from "rehype-katex";
import math from "remark-math";

const config: Config = {
  title: "Leetcode Note",
  tagline: "Here are my notes for algorithm and data structures.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://leetcode.dreams.plus",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "PrinOrange", // Usually your GitHub org/user name.
  projectName: "leetcode-note", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/prinorange/leetcode-note/tree/main/",
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/prinorange/leetcode-note/tree/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Leetcode Note",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "algorithmSidebar",
          position: "left",
          label: "Algorithm",
        },
        {
          type: "docSidebar",
          sidebarId: "dataStructureSidebar",
          position: "left",
          label: "Data Structure",
        },
        {
          type: "docSidebar",
          sidebarId: "mathSidebar",
          position: "left",
          label: "Math",
        },
        {
          href: "https://github.com/prinorange/leetcode-note",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "See Also",
          items: [
            {
              label: "Blog",
              to: "https://dreams.plus",
            },
            {
              label: "GitHub",
              href: "https://github.com/prinorange",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 但为君故`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: "SJA54KPJ03",
      // Public API key: it is safe to commit it
      apiKey: "c39dc474447bfc0b13cc07fd0582af26",
      indexName: "my-leetcode-note",
      // Optional: see doc section below
      contextualSearch: true,
      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: "external\\.com|domain\\.com",
      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: "/docs/", // or as RegExp: /\/docs\//
        to: "/",
      },
      // Optional: Algolia search parameters
      searchParameters: {},
      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: "search",
      //... other Algolia params
    },
  } satisfies Preset.ThemeConfig,

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
};

export default config;

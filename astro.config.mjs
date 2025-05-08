// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import tailwindcss from '@tailwindcss/vite';
import icon from "astro-icon";
import rehypeCallouts from 'rehype-callouts';
import rehypeMermaid from 'rehype-mermaid';
import rehypeCodeGroupReact from './src/lib/plugins/code-group/plugin';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [react(), mdx(), icon()],

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'catppuccin-frappe',
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
        transformerMetaHighlight(),
      ]
    },
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    rehypePlugins: [
      rehypeMermaid,
      [rehypeCallouts, {
        customClassNames: {

          calloutClass: "callout",
          calloutTitleClass: "callout-title",
          calloutContentClass: "callout-content",
        }
      }],
      rehypeCodeGroupReact
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  }
});
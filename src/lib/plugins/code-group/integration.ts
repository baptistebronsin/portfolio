import type { AstroIntegration } from 'astro';
import rehypeCodeGroupReact from './plugin';

export function rehypeCodeGroupIntegration(): AstroIntegration {
  return {
    name: 'rehype-code-group-integration',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            rehypePlugins: [rehypeCodeGroupReact],
          },
          integrations: [],
        });
      },
    },
  };
}

export default rehypeCodeGroupIntegration; 
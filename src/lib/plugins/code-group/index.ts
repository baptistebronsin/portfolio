import type { AstroIntegration } from 'astro';
import type { CodeGroupProps } from './code-group-component';
import rehypeCodeGroupReact from './plugin';

export { CodeGroup } from './code-group-component';
export type { CodeGroupProps };

export function rehypeCodeGroup(): AstroIntegration {
  return {
    name: 'rehype-code-group',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            rehypePlugins: [rehypeCodeGroupReact],
          },
        });
      },
    },
  };
}

export default rehypeCodeGroup;

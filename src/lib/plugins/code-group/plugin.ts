import type { Element, Root } from 'hast';
import { toHtml } from 'hast-util-to-html';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const rehypeCodeGroupReact: Plugin<[], Root> = () => {
  return (tree: Root) => {
    const codeGroups: {
      parent: any;
      index: number;
      endIndex: number;
      labels: string[];
    }[] = [];

    // First pass: identify code groups
    visit(tree, 'element', (node, index, parent) => {
      if (
        node.type === 'element' &&
        node.tagName === 'p' &&
        node.children &&
        node.children[0] &&
        node.children[0].type === 'text'
      ) {
        const textContent = node.children[0].value;
        const match = textContent.match(/^:::code-group\s+labels=\[(.*?)\]$/);

        if (match && parent && typeof index === 'number') {
          // Found a code-group start, now find the end
          const labels = match[1].split(',').map(label => label.trim());

          let endIndex = -1;
          for (let i = index + 1; i < parent.children.length; i++) {
            const child = parent.children[i];
            if (
              child.type === 'element' &&
              child.tagName === 'p' &&
              child.children &&
              child.children[0] &&
              child.children[0].type === 'text' &&
              child.children[0].value.trim() === ':::'
            ) {
              endIndex = i;
              break;
            }
          }

          if (endIndex !== -1) {
            codeGroups.push({
              parent,
              index,
              endIndex,
              labels
            });
          }
        }
      }
    });

    // Second pass: process code groups
    for (let i = codeGroups.length - 1; i >= 0; i--) {
      const { parent, index, endIndex, labels } = codeGroups[i];

      // Extract code blocks
      const codeBlocks = parent.children.slice(index + 1, endIndex)
        .filter((node: any) => node.type === 'element' && node.tagName === 'pre');

      const languages: string[] = [];
      const codes: string[] = [];

      codeBlocks.forEach((codeBlock: Element) => {
        const codeElement = codeBlock.children[0] as Element;

        if (codeElement && codeElement.type === 'element' && codeElement.tagName === 'code') {
          // Get language from class (e.g., "language-js" -> "js")
          const className = codeElement.properties?.className as string[] || [];
          const langClass = className.find(cls => cls.startsWith('language-'));
          const language = langClass ? langClass.replace('language-', '') : '';

          languages.push(language);

          // Preserve the entire HTML output from Shiki including syntax highlighting
          const codeHtml = toHtml(codeBlock);
          codes.push(codeHtml);
        }
      });

      // Create the MDX JSX element
      if (languages.length > 0 && codes.length > 0) {
        const newNode = {
          type: 'mdxJsxFlowElement',
          name: 'CodeGroupWrapper',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'labels', value: JSON.stringify(labels) },
            { type: 'mdxJsxAttribute', name: 'languages', value: JSON.stringify(languages) },
            { type: 'mdxJsxAttribute', name: 'codes', value: JSON.stringify(codes) }
          ],
          children: [],
          data: { _mdxExplicitJsx: true }
        };

        // Replace all nodes from start to end with the new component
        parent.children.splice(index, endIndex - index + 1, newNode);
      }
    }
  };
};

// Helper function to get text content from a node
function getTextContent(node: any): string {
  if (node.type === 'text') {
    return node.value;
  } else if (node.children) {
    return node.children.map(getTextContent).join('');
  }
  return '';
}

export default rehypeCodeGroupReact;

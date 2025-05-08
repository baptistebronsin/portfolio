import type { Element, Root } from 'hast';
import { toHtml } from 'hast-util-to-html';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const rehypeCodeGroupReact: Plugin<[], Root> = () => {
  return (tree) => {
    const nodesToReplace: {
      parent: any;
      startIndex: number;
      nodes: Element[];
      languages: string[];
      labels: (string | null)[];
    }[] = [];

    visit(tree, 'element', (node, index, parent) => {

      if (!parent || node.tagName !== 'p' || index === undefined) return;

      const textNode = node.children[0];
      if (!textNode || textNode.type !== 'text') return;

      const match = textNode.value.match(/^:::code-group(?:\s+labels=\[(.*?)\])?$/);
      if (!match) return;

      const languages: string[] = [];

      for (let i = index + 1; i < parent.children.length; i++) {
        const labels: (string | null)[] = [];

        const n = parent.children[i];
        const fineLabels = match[1]?.split(',').map((l) => l.length > 0 ? l.trim() : null) ?? [];
        fineLabels.forEach((label) => labels.push(label));

        if (n.type === 'element' && n.tagName === 'pre' && n.properties['dataLanguage']) {
          languages.push(n.properties['dataLanguage'].toString().toLowerCase());
        }

        if (
          n.type === 'element' &&
          n.tagName === 'p' &&
          n.children[0]?.type === 'text' &&
          n.children[0].value.trim() === ':::'
        ) {
          nodesToReplace.push({
            parent,
            startIndex: index,
            nodes: parent.children.slice(index, i + 1) as Element[],
            languages,
            labels,
          });
          break;
        }
      }

      for (const { parent, startIndex, nodes, languages, labels } of nodesToReplace) {
        const codeBlocks = nodes.filter(
          (n) => n.type === 'element' && n.tagName === 'pre'
        );

        const codeHtmlBlocks = codeBlocks.map(block => toHtml(block));

        const codeGroup = {
          type: 'mdxJsxFlowElement',
          name: 'CodeGroupWrapper',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'languages', value: JSON.stringify(languages) },
            { type: 'mdxJsxAttribute', name: 'labels', value: JSON.stringify(labels) },
            { type: 'mdxJsxAttribute', name: 'codes', value: JSON.stringify(codeHtmlBlocks) }
          ],
          children: [],
        };

        parent.children.splice(startIndex, nodes.length, codeGroup);
      }
    });

  };
};

export default rehypeCodeGroupReact;

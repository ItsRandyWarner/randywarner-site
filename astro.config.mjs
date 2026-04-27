// @ts-check
import { defineConfig } from "astro/config";

/**
 * @typedef {{ type?: string, value?: string, children?: MarkdownNode[] }} MarkdownNode
 */

function remarkHighlight() {
	/** @param {MarkdownNode} tree */
	return (tree) => {
		replaceHighlightText(tree);
	};
}

/** @param {MarkdownNode} node */
function replaceHighlightText(node) {
	if (!node || !Array.isArray(node.children)) return;

	for (let index = 0; index < node.children.length; index += 1) {
		const child = node.children[index];

		if (child.type === "text" && typeof child.value === "string") {
			const replacement = splitHighlightText(child.value);

			if (replacement.length > 1) {
				node.children.splice(index, 1, ...replacement);
				index += replacement.length - 1;
			}

			continue;
		}

		replaceHighlightText(child);
	}
}

/** @param {string} value */
function splitHighlightText(value) {
	const parts = [];
	const pattern = /==([^=\n][^=\n]*?)==/g;
	let lastIndex = 0;
	let match;

	while ((match = pattern.exec(value))) {
		if (match.index > lastIndex) {
			parts.push({ type: "text", value: value.slice(lastIndex, match.index) });
		}

		parts.push({ type: "html", value: "<mark>" });
		parts.push({ type: "text", value: match[1] });
		parts.push({ type: "html", value: "</mark>" });
		lastIndex = pattern.lastIndex;
	}

	if (lastIndex < value.length) {
		parts.push({ type: "text", value: value.slice(lastIndex) });
	}

	return parts.length > 0 ? parts : [{ type: "text", value }];
}

// https://astro.build/config
export default defineConfig({
	site: "https://randywarner.com",
	markdown: {
		remarkPlugins: [remarkHighlight],
	},
});

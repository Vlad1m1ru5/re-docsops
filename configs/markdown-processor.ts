import rehypeFormat from "rehype-format";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatterPlugin from "remark-extract-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const configureMarkdownProcessor = () => {
  return unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkFrontmatterPlugin) // insert after template render
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeSanitize)
    .use(rehypeStringify);
};

export default configureMarkdownProcessor();

import { remark } from "remark";
import remarkFrontmatterPlugin from "remark-extract-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import { parse } from "yaml";

const configureMarkdownProcessor = () => {
  return remark()
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkFrontmatterPlugin, { yaml: parse });
};

export default configureMarkdownProcessor();

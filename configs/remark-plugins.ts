import remarkFrontmatterPlugin from "remark-extract-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import type { PluginTuple } from "unified";
import { parse } from "yaml";

// ! Should be fine without upcast, but causes type check error
// TODO: fix PluginParameters upcast to `any`
const remarkPlugins: PluginTuple<any[], any, any>[] = [
  [remarkFrontmatter, ["yaml"]],
  [remarkFrontmatterPlugin, { yaml: parse }],
];

export default remarkPlugins;

import { remark } from "remark";
import remarkPlugins from "./remark-plugins";

const markdownProcessor = remarkPlugins.reduce(
  (processor, [plugin, ...settings]) => processor.use(plugin, ...settings),
  remark()
);

export default markdownProcessor;

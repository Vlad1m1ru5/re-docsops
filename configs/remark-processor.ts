import { remark } from "remark";
import remarkPlugins from "./remark-plugins";

const remarkProcessor = remarkPlugins.reduce(
  (processor, [plugin, ...settings]) => processor.use(plugin, ...settings),
  remark()
);

export default remarkProcessor;

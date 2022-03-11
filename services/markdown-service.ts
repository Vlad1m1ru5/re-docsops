import markdownProcessor from "@/configs/markdown-processor";
import type { Processor } from "unified";

class MarkdownService {
  #markdownProcessor;

  constructor(markdownProcessor: Processor) {
    this.#markdownProcessor = markdownProcessor;
  }

  async processMarkdown(
    markdown: string
  ): Promise<[string, Record<string, unknown>]> {
    try {
      const vFile = await this.#markdownProcessor.process(markdown);
      return [vFile.toString(), vFile.data];
    } catch (error) {
      console.error(error);
      return ["", {}];
    }
  }
}

export default new MarkdownService(markdownProcessor);

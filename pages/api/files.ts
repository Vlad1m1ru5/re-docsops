import incomingForm from "@/configs/incoming-form";
import documentsService from "@/services/documents-service";
import filesService from "@/services/files-service";
import markdownService from "@/services/markdown-service";
import { STATUS_CODES } from "http";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).end(STATUS_CODES[405]);
  }

  incomingForm.parse(req, async (err, _, { upload = [] }) => {
    if (err) {
      return res.status(500).end(STATUS_CODES[500]);
    }

    const files = filesService.mapToFiles(upload);
    const [markdownFiles] = filesService.partitionMarkdownFiles(files);

    for await (const markdown of markdownFiles.map(filesService.read)) {
      const [content, data] = await markdownService.processMarkdown(markdown);
      await documentsService.postDocument({ content, data });
    }
  });

  return res.status(201).end(STATUS_CODES[201]);
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};

import documentsService from "@/services/documents-service";
import httpFilesService from "@/services/http-files-service";
import localFilesService from "@/services/local-files-service";
import markdownService from "@/services/markdown-service";
import { STATUS_CODES } from "http";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).end(STATUS_CODES[405]);
  }

  try {
    const upload = await httpFilesService.getFileByFileName(req, "upload");
    const files = localFilesService.mapToFiles(upload);
    const [mdFiles] = localFilesService.partitionMarkdownFiles(files);

    for await (const markdown of mdFiles.map(localFilesService.read)) {
      const [content, data] = await markdownService.processMarkdown(markdown);
      await documentsService.postDocument({ content, data });
    }

    return res.status(201).end(STATUS_CODES[201]);
  } catch (error) {
    return res.status(500).end(STATUS_CODES[500]);
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};

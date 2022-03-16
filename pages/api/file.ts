import { readFile } from "fs/promises";
import { STATUS_CODES } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import incomingForm from "~/configs/incoming-form";
import markdownProcessor from "~/configs/markdown-processor";
import supabaseAdmin from "~/configs/supabase-admin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== "POST") return res.status(405).end(STATUS_CODES[405]);

  incomingForm.parse(req, async (err, _, files) => {
    if (err) return res.status(500).end(err);

    if (!files.file || Array.isArray(files.file)) {
      return res.status(400).end(STATUS_CODES[400]);
    }

    try {
      const buffer = await readFile(files.file.filepath, "utf-8");
      const vFile = await markdownProcessor.process(buffer);

      vFile.data.name = vFile.data.name || files.file.originalFilename;
      vFile.data.title = vFile.data.title || vFile.data.name;

      const values = { data: vFile.data, content: vFile.toString() };

      const { data } = await supabaseAdmin.from("test").upsert(values);
      const body =
        data?.map(({ id, data }) => (data.key ? data : { ...data, key: id })) ??
        [];

      return res.status(200).json(body);
    } catch (error) {
      return res.status(500).end(error);
    }
  });
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};

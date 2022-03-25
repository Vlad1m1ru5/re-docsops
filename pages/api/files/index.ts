import type { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "node:fs/promises";
import { STATUS_CODES } from "node:http";
import incomingForm from "~/configs/incoming-form";
import liquidProcessor from "~/configs/liquid-processor";
import remarkProcessor from "~/configs/remark-processor";
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
      const vFile = await remarkProcessor.process(buffer);

      vFile.data.name = vFile.data.name || files.file.originalFilename;
      vFile.data.title = vFile.data.title || vFile.data.name;

      const html = vFile.toString();
      const { data } = vFile;
      const content = await liquidProcessor.parseAndRender(html, data);

      const { data: resData } = await supabaseAdmin
        .from("test")
        .insert({ data, content })
        .select("id")
        .throwOnError()
        .single();

      return res.status(200).json(resData);
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

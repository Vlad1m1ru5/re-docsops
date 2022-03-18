import { STATUS_CODES } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import supabaseClient from "~/configs/supabase-client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  if (method !== "GET") return res.status(405).end(STATUS_CODES[405]);

  const { id, ext } = query;

  if (
    !id ||
    Array.isArray(id) ||
    typeof ext !== "string" ||
    !["docx", "pdf"].includes(ext)
  ) {
    return res.status(400).end(STATUS_CODES[400]);
  }

  const filename = `${id}.${ext}`;
  supabaseClient.storage.from("test").getPublicUrl(filename).data;

  return res.status(200).end();
};

export default handler;

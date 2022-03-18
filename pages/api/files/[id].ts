import type { NextApiRequest, NextApiResponse } from "next";
import { STATUS_CODES } from "node:http";
import supabaseAdmin from "~/configs/supabase-admin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  if (method !== "DELETE") return res.status(405).end(STATUS_CODES[405]);

  const { id } = query;

  if (typeof id !== "string") return res.status(400).end(STATUS_CODES[400]);

  const { data } = await supabaseAdmin
    .from("test")
    .delete()
    .match({ id })
    .select("id")
    .throwOnError()
    .single();

  if (!data) return res.status(404).end(STATUS_CODES[404]);

  return res.status(200).json(data);
};

export default handler;

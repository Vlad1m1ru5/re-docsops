import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).end();
  }

  formidable().parse(req, (err, _, files) => {
    if (err) {
      return res.status(400).end(err);
    }

    console.log(files.files);
  });

  return res.status(201).end();
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};

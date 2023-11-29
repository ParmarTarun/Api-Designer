// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mongooseConnect } from "@/lib/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await mongooseConnect();
  res.status(200).json({ message: "Yup, it works" });
};

export default handler;

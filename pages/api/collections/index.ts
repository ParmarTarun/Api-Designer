// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCollections, postCollection } from "@/lib/collections";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  [key: string]: any;
};

// GET, POST  /collections

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "GET": {
      try {
        const collections = await getCollections();
        return res.status(200).json({ message: "Success", collections });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
      }
    }

    case "POST": {
      try {
        const { name, baseUrl } = req.body;
        if (!name || !baseUrl) {
          return res.status(400).json({ message: "Invalid request" });
        }
        const collection = await postCollection({
          name,
          baseUrl,
          entities: [],
        });
        return res.status(201).json({ message: "Success", collection });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
      }
    }

    default:
      res.status(405).json({ message: `${req.method} is not allowed.` });
      break;
  }
};

export default handler;

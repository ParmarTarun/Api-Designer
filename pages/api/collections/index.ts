// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mongooseConnect } from "@/lib/mongoose";
import { Collection } from "@/models/Collection";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  [key: string]: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await mongooseConnect();
  switch (req.method) {
    case "GET": {
      try {
        const collectionDocs = await Collection.find();
        const collections = collectionDocs.map((row) => {
          return {
            name: row.name,
            baseUrl: row.baseUrl,
          };
        });
        return res.status(200).json({ message: "Success", collections });
      } catch (e) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
    }

    case "POST": {
      try {
        const { name, baseUrl } = req.body;
        if (!name || !baseUrl) {
          return res.status(400).json({ message: "Invalid request" });
        }
        const collectionDoc = await Collection.create({ name, baseUrl });
        console.log(collectionDoc);
        const collection = { name, baseUrl };

        return res.status(201).json({ message: "Success", collection });
      } catch (e) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
    }

    default:
      res.status(405).json({ message: `${req.method} is not allowed.` });
      break;
  }
};

export default handler;

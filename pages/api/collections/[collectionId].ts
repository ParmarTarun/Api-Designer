// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteCollection, patchCollection } from "@/lib/collections";
import { InvalidCollectionId } from "@/lib/customErrors";
import { isValidObjectId } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  [key: string]: any;
};

// DELETE, PATCH   /collections/<collectionId>

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { collectionId = "" } = req.query;

  if (!isValidObjectId(collectionId))
    return res.status(400).json({ message: "Invalid collection Id" });

  switch (req.method) {
    case "PATCH": {
      try {
        const { name, desc, baseUrl, entities } = req.body;
        if (!name || !baseUrl || !entities) {
          return res.status(400).json({ message: "Invalid request" });
        }
        const collection = await patchCollection(collectionId.toString(), {
          name,
          desc,
          baseUrl,
          entities,
        });
        return res.status(200).json({ message: "Success", collection });
      } catch (e) {
        if (e instanceof InvalidCollectionId) {
          return res.status(400).json({ message: e.message });
        }
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
      }
    }

    case "DELETE": {
      try {
        const result = await deleteCollection(collectionId.toString());
        return res.status(200).json({ message: "Success" });
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

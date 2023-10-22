import { InvalidCollectionId } from "@/lib/customErrors";
import { getEntities, postEntity } from "@/lib/entities";
import { isValidObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  [key: string]: any;
};

// GET, POST  /entities

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "GET": {
      try {
        const entities = await getEntities();
        return res.status(200).json({ message: "Success", entities });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
      }
    }

    case "POST": {
      try {
        const { name, collectionId } = req.body;

        if (!name || !collectionId) {
          return res.status(400).json({ message: "Invalid request" });
        }
        if (!isValidObjectId(collectionId))
          return res.status(400).json({ message: "Invalid collection Id" });

        const entity = await postEntity({ name, collectionId, requests: [] });
        return res.status(201).json({ message: "Success", entity });
      } catch (e) {
        if (e instanceof InvalidCollectionId) {
          return res.status(400).json({ message: e.message });
        }
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

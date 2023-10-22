// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteEntity, patchEntity } from "@/lib/entities";
import { InvalidEntityId } from "@/lib/customErrors";
import { isValidObjectId } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  [key: string]: any;
};

// DELETE, PATCH   /entities/<entityId>

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { entityId = "" } = req.query;

  if (!isValidObjectId(entityId))
    return res.status(400).json({ message: "Invalid entity Id" });

  switch (req.method) {
    case "PATCH": {
      try {
        const { name, requests } = req.body;

        if (!name || !requests) {
          return res.status(400).json({ message: "Invalid request" });
        }

        const entity = await patchEntity(entityId.toString(), {
          name,
          requests,
          collectionId: "", // collection id not needed for patch but mentioned in types because needed in post call
        });
        return res.status(200).json({ message: "Success", entity });
      } catch (e) {
        if (e instanceof InvalidEntityId) {
          return res.status(400).json({ message: e.message });
        }
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
      }
    }

    case "DELETE": {
      try {
        const result = await deleteEntity(entityId.toString());
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

import { InvalidCollectionId, InvalidEntityId } from "@/lib/customErrors";
import { getEntities, postEntity } from "@/lib/entities";
import { getRequests, postRequest } from "@/lib/requests";
import { isValidObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  [key: string]: any;
};

// GET, POST  /requests

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "GET": {
      try {
        const requests = await getRequests();
        return res.status(200).json({ message: "Success", requests });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
      }
    }

    case "POST": {
      try {
        const { name, method, path, entityId } = req.body;

        if (!name || !method || !path || !entityId) {
          return res.status(400).json({ message: "Invalid request" });
        }
        if (!isValidObjectId(entityId))
          return res.status(400).json({ message: "Invalid entity Id" });

        const request = await postRequest({ name, path, method, entityId });
        return res.status(201).json({ message: "Success", request });
      } catch (e) {
        if (e instanceof InvalidEntityId) {
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

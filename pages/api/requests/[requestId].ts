// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { InvalidRequestId } from "@/lib/customErrors";
import { isValidObjectId } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteRequest, patchRequest } from "@/lib/requests";

type Data = {
  message: string;
  [key: string]: any;
};

// DELETE, PATCH   /requests/<requestId>

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { requestId = "" } = req.query;
  if (!isValidObjectId(requestId))
    return res.status(400).json({ message: "Invalid request Id" });

  switch (req.method) {
    case "PATCH": {
      try {
        const { name, method, path, authorization, body, headers, params } =
          req.body;

        if (!name || !method || !path) {
          return res.status(400).json({ message: "Invalid request" });
        }

        const request = await patchRequest(requestId.toString(), {
          name,
          method,
          path,
          authorization,
          body,
          headers,
          params,
          entityId: "", // entity id not needed for patch but mentioned in types because needed in post call
        });
        return res.status(200).json({ message: "Success", request });
      } catch (e) {
        if (e instanceof InvalidRequestId) {
          return res.status(400).json({ message: e.message });
        }
        console.log(e);
        return res.status(500).json({ message: "Something went wrong!" });
      }
    }

    case "DELETE": {
      try {
        const result = await deleteRequest(requestId.toString());
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

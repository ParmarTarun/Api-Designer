import { Schema, model, models } from "mongoose";
import { Entity } from "./Entity";
import { authorization, body, header, param, response } from "@/types";

export type requestType = {
  id: string;
  name: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  params: param[];
  authorization: authorization;
  headers: header[];
  body: body;
  response: response;
  createdAt: string;
};

const RequestSchema = new Schema<requestType>(
  {
    name: String,
    method: String,
    path: String,
    params: [Object],
    authorization: Object,
    headers: [Object],
    body: String,
    response: Object,
  },
  {
    timestamps: true,
  }
);

// hook to delete all referenced requests in the entity on delete request
RequestSchema.post("findOneAndDelete", (request) => {
  if (!request) return;
  const reqId = request._id;
  Entity.find({ requests: { $in: [reqId] } }).then((requests) => {
    Promise.all(
      requests.map((req) =>
        Entity.findByIdAndUpdate(
          req._id,
          { $pull: { requests: reqId } },
          { new: true }
        )
      )
    );
  });
});

export const Request = models.Request || model("Request", RequestSchema);

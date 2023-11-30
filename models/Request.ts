import { Schema, model, models } from "mongoose";
import { Entity } from "./Entity";

export type requestType = {
  id: string;
  name: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  params: { key: string; value: string; desc: string }[];
  authorization: { type: "NO_AUTH" | "BEARER_TOKEN"; value: any }[];
  headers: { key: string; value: string; desc: string }[];
  body: { [key: string]: string } | string;
  createdAt: string;
};

const RequestSchema = new Schema<requestType>(
  {
    name: String,
    method: String,
    path: String,
  },
  {
    timestamps: true,
  }
);

// hook to delete all referenced entities in the collection on delete entity
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

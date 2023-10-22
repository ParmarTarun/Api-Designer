import { Schema, model, models } from "mongoose";

export type requestType = {
  id: string;
  name: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
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

export const Request = models.Request || model("Request", RequestSchema);

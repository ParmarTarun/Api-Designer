import { Schema, model, models } from "mongoose";
import { requestType } from "./Request";

export type entityType = {
  id: string;
  name: string;
  requests: requestType[];
  createdAt: string;
};

const EntitySchema = new Schema<entityType>(
  {
    name: String,
    requests: [{ type: Schema.Types.ObjectId, ref: "Request", default: [] }],
  },
  {
    timestamps: true,
  }
);

export const Entity = models.Entity || model("Entity", EntitySchema);

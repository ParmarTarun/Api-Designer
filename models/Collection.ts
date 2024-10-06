import { Schema, model, models } from "mongoose";
import { entityType } from "./Entity";
const Entity = require("./Entity"); // this way entity model will be registered and avoid error
export type collectionType = {
  id: string;
  name: string;
  desc?: string;
  baseUrl: string;
  entities: entityType[];
  createdAt: string;
};

const CollectionSchema = new Schema<collectionType>(
  {
    name: { type: String, required: true },
    desc: { type: String },
    entities: [{ type: Schema.Types.ObjectId, ref: "Entity", default: [] }],
    baseUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Collection =
  models.Collection || model("Collection", CollectionSchema);

import { Schema, model, models } from "mongoose";
import { entityType } from "./Entity";
const Entity = require("./Entity"); // this way entity model will be registered and avoid error
export type collectionType = {
  id: string;
  name: string;
  baseUrl: string;
  entities: entityType[];
  createdAt: string;
};

const CollectionSchema = new Schema<collectionType>(
  {
    name: String,
    entities: [{ type: Schema.Types.ObjectId, ref: "Entity", default: [] }],
    baseUrl: String,
  },
  {
    timestamps: true,
  }
);

export const Collection =
  models.Collection || model("Collection", CollectionSchema);

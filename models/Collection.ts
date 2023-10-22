import { Schema, model, models } from "mongoose";
import { Entity, entityType } from "./Entity";

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
    entities: [
      { type: Schema.Types.ObjectId, ref: Entity.modelName, default: [] },
    ],
    baseUrl: String,
  },
  {
    timestamps: true,
  }
);

export const Collection =
  models.Collection || model("Collection", CollectionSchema);

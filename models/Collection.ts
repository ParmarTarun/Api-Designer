import { Schema, model, models } from "mongoose";

export type collectionType = {
  id: string;
  name: string;
  baseUrl: string;
  createdAt: string;
};

const CollectionSchema = new Schema<collectionType>(
  {
    name: String,
    baseUrl: String,
  },
  {
    timestamps: true,
  }
);

export const Collection =
  models.Collection || model("Collection", CollectionSchema);

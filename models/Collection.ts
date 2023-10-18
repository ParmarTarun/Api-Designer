import { Schema, model, models } from "mongoose";

type collectionType = {
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

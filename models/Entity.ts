import { Schema, model, models } from "mongoose";

export type entityType = {
  id: string;
  name: string;
  requests: string[];
  createdAt: string;
};

const EntitySchema = new Schema<entityType>(
  {
    name: String,
    requests: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const Entity = models.Entity || model("Entity", EntitySchema);

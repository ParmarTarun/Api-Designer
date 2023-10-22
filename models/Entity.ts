import { Schema, model, models } from "mongoose";
import { requestType } from "./Request";
import { Collection } from "./Collection";
const Request = require("./Request"); // this way entity model will be registered and avoid error
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

// hook to delete all referenced entities in the collection on delete entity
EntitySchema.post("findOneAndDelete", (entity) => {
  if (!entity) return;
  const enId = entity._id;
  Collection.find({ entities: { $in: [enId] } }).then((collections) => {
    Promise.all(
      collections.map((coll) =>
        Collection.findByIdAndUpdate(
          coll._id,
          { $pull: { entities: enId } },
          { new: true }
        )
      )
    );
  });
});

export const Entity = models.Entity || model("Entity", EntitySchema);

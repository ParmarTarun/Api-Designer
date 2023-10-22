import { Entity, entityType } from "@/models/Entity";
import { mongooseConnect } from "./mongoose";
import { entityBody } from "@/types";
import { Collection } from "@/models/Collection";
import { InvalidCollectionId } from "./customErrors";

type getEntitiesType = () => Promise<entityType[]>;
type postEntityType = (data: entityBody) => Promise<entityType>;

export const getEntities: getEntitiesType = async () => {
  await mongooseConnect();
  const entityDocs = await Entity.find({}, {}, { sort: { createdAt: -1 } });

  let entities: entityType[] = [];
  entityDocs.forEach((row) => {
    entities.push({
      id: row._id,
      name: row.name,
      requests: row.requests,
      createdAt: row.createdAt,
    });
  });

  return entities;
};

export const postEntity: postEntityType = async ({ name, collectionId }) => {
  await mongooseConnect();
  // get collection
  const collection = await Collection.findById(collectionId);
  if (!collection) throw new InvalidCollectionId();
  // create entity
  const entity = await Entity.create({ name });
  // add new entity Id in collection
  const res = await Collection.updateOne(
    { _id: collectionId },
    { $push: { entities: entity._id } }
  );
  console.log(res);

  return {
    name,
    createdAt: entity.createdAt,
    requests: entity.requests,
    id: entity._id,
  };
};

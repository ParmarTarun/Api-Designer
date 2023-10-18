import { Collection, collectionType } from "@/models/Collection";
import { mongooseConnect } from "./mongoose";
import { collectionBody } from "@/types";
import { InvalidCollectionId } from "./customErrors";

type getCollectionType = () => Promise<collectionType[]>;
export const getCollections: getCollectionType = async () => {
  await mongooseConnect();
  const collectionDocs = await Collection.find(
    {},
    {},
    { sort: { createdAt: -1 } }
  );

  let collections: collectionType[] = [];
  collectionDocs.forEach((row) => {
    collections.push({
      id: row._id,
      name: row.name,
      baseUrl: row.baseUrl,
      createdAt: row.createdAt,
    });
  });

  return collections;
};

type postCollectionType = (data: collectionBody) => Promise<collectionType>;
export const postCollection: postCollectionType = async ({ name, baseUrl }) => {
  await mongooseConnect();
  const collection = await Collection.create({ name, baseUrl });

  return { name, baseUrl, createdAt: collection.createdAt, id: collection._id };
};

type patchCollectionType = (
  id: string,
  data: collectionBody
) => Promise<collectionType>;
export const patchCollection: patchCollectionType = async (
  id,
  { name, baseUrl }
) => {
  await mongooseConnect();
  const collection = await Collection.findByIdAndUpdate(id, {
    name,
    baseUrl,
  });
  if (!collection) throw new InvalidCollectionId();

  return { name, baseUrl, createdAt: collection.createdAt, id: collection._id };
};

type deleteCollectionType = (id: string) => Promise<boolean>;
export const deleteCollection: deleteCollectionType = async (id) => {
  await mongooseConnect();
  const result = await Collection.findByIdAndDelete(id);

  return true;
};

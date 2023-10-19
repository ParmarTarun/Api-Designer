import { Collection, collectionType } from "@/models/Collection";
import { mongooseConnect } from "./mongoose";
import { collectionBody } from "@/types";
import { InvalidCollectionId } from "./customErrors";

type getCollectionsType = () => Promise<collectionType[]>;
type getCollectionType = (id: string) => Promise<collectionType>;
type getCollectionByNameType = (name: string) => Promise<collectionType>;
type postCollectionType = (data: collectionBody) => Promise<collectionType>;
type deleteCollectionType = (id: string) => Promise<boolean>;

export const getCollections: getCollectionsType = async () => {
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

export const getCollection: getCollectionType = async (collId) => {
  await mongooseConnect();
  const collection = await Collection.findById(collId);
  const { name, baseUrl, createdAt, id } = collection as collectionType;

  return { name, baseUrl, createdAt, id };
};

export const getCollectionByName: getCollectionByNameType = async (
  collName
) => {
  await mongooseConnect();
  const collection = await Collection.findOne({ name: collName });
  const { name, baseUrl, createdAt, id } = collection as collectionType;

  return { name, baseUrl, createdAt, id };
};

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

export const deleteCollection: deleteCollectionType = async (id) => {
  await mongooseConnect();
  const result = await Collection.findByIdAndDelete(id);

  return true;
};

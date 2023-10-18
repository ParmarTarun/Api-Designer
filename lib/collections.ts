import { Collection, collectionType } from "@/models/Collection";
import { mongooseConnect } from "./mongoose";
import { collectionBody } from "@/types";

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

  return { name, baseUrl, createdAt: collection.createdAt };
};

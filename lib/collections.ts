import { Collection, collectionType } from "@/models/Collection";

type getCollectionType = () => Promise<collectionType[]>;
export const getCollections: getCollectionType = async () => {
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

type postCollectionType = ({
  name,
  baseUrl,
  createdAt = "",
}: collectionType) => Promise<collectionType>;
export const postCollection: postCollectionType = async ({ name, baseUrl }) => {
  const collection = await Collection.create({ name, baseUrl });

  return { name, baseUrl, createdAt: collection.createdAt };
};

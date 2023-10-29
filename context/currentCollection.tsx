import { collectionType } from "@/models/Collection";
import { entityType } from "@/models/Entity";
import { requestType } from "@/models/Request";
import { ReactChildrenProps, requestBody } from "@/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type singleCollectionContextType = {
  collection: collectionType;
  setCollection: Dispatch<SetStateAction<collectionType>>;
  addEntity: (ent: entityType) => void;
  addRequest: (entId: string, req: requestType) => void;
  updateEntity: (ent: entityType) => void;
};

const initialValues: singleCollectionContextType = {
  collection: { id: "", baseUrl: "", createdAt: "", entities: [], name: "" },
  setCollection: () => {},
  addEntity: () => {},
  addRequest: () => {},
  updateEntity: () => {},
};

const SingleCollectionContext =
  createContext<singleCollectionContextType>(initialValues);

export function useSingleCollection() {
  return useContext(SingleCollectionContext);
}

export function SingleCollectionProvider({ children }: ReactChildrenProps) {
  const [collection, setCollection] = useState(initialValues.collection);

  const addEntity = (entity: entityType) => {
    setCollection({
      ...collection,
      entities: [entity, ...collection.entities],
    });
  };

  const updateEntity = (entity: entityType) => {
    const updatedEntities = collection.entities.filter(
      (ent: entityType) => ent.id !== entity.id
    );
    setCollection({
      ...collection,
      entities: [entity, ...updatedEntities],
    });
  };

  const addRequest = (entId: string, req: requestType) => {};
  const value = {
    collection,
    setCollection,
    addEntity,
    addRequest,
    updateEntity,
  };
  return (
    <>
      <SingleCollectionContext.Provider value={value}>
        {children}
      </SingleCollectionContext.Provider>
    </>
  );
}

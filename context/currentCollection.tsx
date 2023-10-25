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
};

const initialValues: singleCollectionContextType = {
  collection: { id: "", baseUrl: "", createdAt: "", entities: [], name: "" },
  setCollection: () => {},
  addEntity: () => {},
  addRequest: () => {},
};

const SingleCollectionContext =
  createContext<singleCollectionContextType>(initialValues);

export function useSingleCollection() {
  return useContext(SingleCollectionContext);
}

export function SingleCollectionProvider({ children }: ReactChildrenProps) {
  const [collection, setCollection] = useState(initialValues.collection);
  const addEntity = (ent: entityType) => {};
  const addRequest = (entId: string, req: requestType) => {};
  const value = {
    collection,
    setCollection,
    addEntity,
    addRequest,
  };
  return (
    <>
      <SingleCollectionContext.Provider value={value}>
        {children}
      </SingleCollectionContext.Provider>
    </>
  );
}

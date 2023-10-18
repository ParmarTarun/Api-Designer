import { collectionType } from "@/models/Collection";
import { ReactChildrenProps } from "@/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type collectionContextType = {
  collections: collectionType[];
  setCollections: Dispatch<SetStateAction<collectionType[]>>;
};

const initialValues: collectionContextType = {
  collections: [],
  setCollections: () => {},
};

const CollectionContext = createContext<collectionContextType>(initialValues);

export function useCollection() {
  return useContext(CollectionContext);
}

export function CollectionProvider({ children }: ReactChildrenProps) {
  const [collections, setCollections] = useState(initialValues.collections);
  const value = {
    collections,
    setCollections,
  };
  return (
    <>
      <CollectionContext.Provider value={value}>
        {children}
      </CollectionContext.Provider>
    </>
  );
}

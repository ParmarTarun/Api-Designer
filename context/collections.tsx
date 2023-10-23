import { collectionType } from "@/models/Collection";
import { ReactChildrenProps } from "@/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type collectionsContextType = {
  collections: collectionType[];
  setCollections: Dispatch<SetStateAction<collectionType[]>>;
};

const initialValues: collectionsContextType = {
  collections: [],
  setCollections: () => {},
};

const CollectionsContext = createContext<collectionsContextType>(initialValues);

export function useCollections() {
  return useContext(CollectionsContext);
}

export function CollectionsProvider({ children }: ReactChildrenProps) {
  const [collections, setCollections] = useState(initialValues.collections);
  const value = {
    collections,
    setCollections,
  };
  return (
    <>
      <CollectionsContext.Provider value={value}>
        {children}
      </CollectionsContext.Provider>
    </>
  );
}

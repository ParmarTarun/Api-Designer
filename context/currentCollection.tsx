import { collectionType } from "@/models/Collection";
import { entityType } from "@/models/Entity";
import { requestType } from "@/models/Request";
import { ReactChildrenProps } from "@/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type singleCollectionContextType = {
  currentCollection: collectionType;
  currentEntityIndex: number;
  currentRequestIndex: number;
  setCurrentEntityIndex: (n: number) => void;
  setCurrentRequestIndex: (n: number) => void;
  setCurrentCollection: Dispatch<SetStateAction<collectionType>>;
  addEntity: (ent: entityType) => void;
  addRequest: (entId: string, req: requestType) => void;
  updateEntity: (ent: entityType) => void;
  removeEntity: (ent: entityType) => void;
};

const initialValues: singleCollectionContextType = {
  currentCollection: {
    id: "",
    baseUrl: "",
    createdAt: "",
    entities: [],
    name: "",
  },
  currentEntityIndex: 0,
  currentRequestIndex: 0,
  setCurrentEntityIndex: () => {},
  setCurrentRequestIndex: () => {},
  setCurrentCollection: () => {},
  addEntity: () => {},
  addRequest: () => {},
  updateEntity: () => {},
  removeEntity: () => {},
};

const SingleCollectionContext =
  createContext<singleCollectionContextType>(initialValues);

export function useCurrentCollection() {
  return useContext(SingleCollectionContext);
}

export function SingleCollectionProvider({ children }: ReactChildrenProps) {
  const [currentCollection, setCurrentCollection] = useState(
    initialValues.currentCollection
  );
  const [currentEntityIndex, _setCurrentEntityIndex] = useState<number>(0);
  const [currentRequestIndex, _setCurrentRequestIndex] = useState<number>(0);

  const setCurrentEntityIndex = (n: number) => {
    _setCurrentEntityIndex(n);
    _setCurrentRequestIndex(0);
  };
  const setCurrentRequestIndex = (n: number) => {
    _setCurrentRequestIndex(n);
  };

  const addEntity = (entity: entityType) => {
    setCurrentCollection({
      ...currentCollection,
      entities: [entity, ...currentCollection.entities],
    });
  };

  const updateEntity = (entity: entityType) => {
    const updatedEntities = currentCollection.entities.map(
      (ent: entityType) => {
        if (ent.id === entity.id) return entity; // replace the updated entity
        return ent;
      }
    );
    setCurrentCollection({
      ...currentCollection,
      entities: updatedEntities,
    });
  };

  const removeEntity = (entity: entityType) => {
    const updatedEntities = currentCollection.entities.filter(
      (ent: entityType) => ent.id !== entity.id
    );
    setCurrentCollection({
      ...currentCollection,
      entities: updatedEntities,
    });
  };

  const addRequest = (entId: string, req: requestType) => {
    const updatedEntities = currentCollection.entities.map((ent) => {
      if (ent.id === entId) {
        return {
          ...ent,
          requests: [...ent.requests, req],
        };
      }
      return ent;
    });
    setCurrentCollection({
      ...currentCollection,
      entities: updatedEntities,
    });
    _setCurrentRequestIndex(
      currentCollection.entities[currentEntityIndex].requests.length
    );
  };
  const value = {
    currentCollection,
    currentEntityIndex,
    currentRequestIndex,
    setCurrentRequestIndex,
    setCurrentEntityIndex,
    setCurrentCollection,
    addEntity,
    addRequest,
    updateEntity,
    removeEntity,
  };
  return (
    <>
      <SingleCollectionContext.Provider value={value}>
        {children}
      </SingleCollectionContext.Provider>
    </>
  );
}

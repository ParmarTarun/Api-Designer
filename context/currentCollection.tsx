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
  currentEntity: number;
  currentRequest: number;
  setCurrentEntity: (n: number) => void;
  setCurrentRequest: (n: number) => void;
  setCurrentCollection: Dispatch<SetStateAction<collectionType>>;
  addEntity: (ent: entityType) => void;
  addRequest: (entId: string, req: requestType) => void;
  updateEntity: (ent: entityType) => void;
};

const initialValues: singleCollectionContextType = {
  currentCollection: {
    id: "",
    baseUrl: "",
    createdAt: "",
    entities: [],
    name: "",
  },
  currentEntity: 0,
  currentRequest: 0,
  setCurrentEntity: () => {},
  setCurrentRequest: () => {},
  setCurrentCollection: () => {},
  addEntity: () => {},
  addRequest: () => {},
  updateEntity: () => {},
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
  const [currentEntity, _setCurrentEntity] = useState<number>(0);
  const [currentRequest, _setCurrentRequest] = useState<number>(0);

  const setCurrentEntity = (n: number) => {
    _setCurrentEntity(n);
    _setCurrentRequest(0);
  };
  const setCurrentRequest = (n: number) => {
    _setCurrentRequest(n);
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
    _setCurrentRequest(
      currentCollection.entities[currentEntity].requests.length
    );
  };
  const value = {
    currentCollection,
    currentEntity,
    currentRequest,
    setCurrentRequest,
    setCurrentEntity,
    setCurrentCollection,
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

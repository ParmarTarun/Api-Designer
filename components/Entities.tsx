import { entityType } from "@/models/Entity";
import React from "react";

interface entitiesProps {
  entities: entityType[];
  currentEntity: entityType;
  setEntity: (p: entityType) => void;
}

const Entities = ({ entities, currentEntity, setEntity }: entitiesProps) => {
  return (
    <>
      <h5 className="mb-1">Enitites:</h5>
      <div className="flex items-center gap-4 text-secondary">
        {entities.map((entity, i) => (
          <button
            key={i}
            className={`bg-primary rounded-md px-4 py-1 ${
              entity.name === currentEntity.name
                ? "border-2 border-darkHighlight"
                : "border-2 border-transparent"
            }`}
            onClick={() => setEntity(entity)}
          >
            {entity.name}
          </button>
        ))}
        {/* <button className="bg-primary rounded-md px-4 py-1 ">
              Service
            </button> */}
      </div>
    </>
  );
};

export default Entities;

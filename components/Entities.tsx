import { entityType } from "@/models/Entity";
import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

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
        <div className="text-center mt-4">
          <button onClick={() => {}}>
            <IoMdAddCircleOutline className=" text-primary text-2xl" />
          </button>
        </div>
      </div>
      {entities.length === 0 && (
        <div className="text-center text-primary">
          <p>Add an entity</p>
        </div>
      )}
    </>
  );
};

export default Entities;

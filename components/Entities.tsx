import { entityType } from "@/models/Entity";
import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

interface entitiesProps {
  entities: entityType[];
}

const Entities = ({ entities }: entitiesProps) => {
  return (
    <>
      <h5 className="mb-1">Entites:</h5>
      <div className="flex items-center gap-4 text-secondary">
        {entities.map((entity, i) => (
          <button key={i} className={`bg-primary rounded-md px-4 py-1`}>
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

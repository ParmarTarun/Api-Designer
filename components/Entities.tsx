import { entityType } from "@/models/Entity";
import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import EntityFormModal from "./EntityFormModal";
import { MdModeEdit } from "react-icons/md";
import { useCurrentCollection } from "@/context/currentCollection";

interface entitiesProps {}

const Entities = ({}: entitiesProps) => {
  const { currentCollection, currentEntityIndex, setCurrentEntityIndex } =
    useCurrentCollection();
  const [showModal, setShowModal] = useState(false);
  const [editingEntity, setEditingEntity] = useState<entityType | undefined>();

  const handleModalClose = () => {
    setEditingEntity(undefined);
    setShowModal(false);
  };

  const handleEdit = (e: React.MouseEvent, ent: entityType) => {
    setEditingEntity(ent);
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <h5 className="mb-1">Entites:</h5>
      <div className="flex items-center gap-4 text-secondary">
        {currentCollection.entities.map((entity, i) => (
          <div key={i}>
            <button
              key={i}
              className={`bg-primary rounded-md px-4 py-1 border-2 ${
                currentCollection.entities[currentEntityIndex]?.id === entity.id
                  ? "border-darkHighlight"
                  : "dark-transparent"
              }`}
              onClick={() => setCurrentEntityIndex(i)}
            >
              {entity.name}
            </button>
            <button
              className="text-primary"
              onClick={(e) => handleEdit(e, entity)}
            >
              <MdModeEdit />
            </button>
          </div>
        ))}
        <div className="text-center flex gap-4 items-center">
          <button onClick={() => setShowModal(true)}>
            <IoMdAddCircleOutline className=" text-primary text-2xl" />
          </button>
          {currentCollection.entities.length === 0 && (
            <p className="text-primary inline">Create a new Entity</p>
          )}
        </div>
      </div>
      {!!showModal && (
        <EntityFormModal close={handleModalClose} entity={editingEntity} />
      )}
    </>
  );
};

export default Entities;
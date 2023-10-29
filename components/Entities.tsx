import { entityType } from "@/models/Entity";
import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import EntityFormModal from "./EntityFormModal";
import { MdModeEdit } from "react-icons/md";

interface entitiesProps {
  entities: entityType[];
  currentEntity?: entityType;
  setCurrentEntity: (p: entityType) => void;
}

const Entities = ({
  entities,
  currentEntity,
  setCurrentEntity,
}: entitiesProps) => {
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

  useEffect(() => {
    if (entities.length > 0) setCurrentEntity(entities[0]);
  }, [entities]);

  return (
    <>
      <h5 className="mb-1">Entites:</h5>
      <div className="flex items-center gap-4 text-secondary">
        {entities.map((entity, i) => (
          <>
            <button
              key={i}
              className={`bg-primary rounded-md px-4 py-1 border-2 ${
                currentEntity?.id === entity.id
                  ? "border-darkHighlight"
                  : "dark-transparent"
              }`}
              onClick={() => setCurrentEntity(entity)}
            >
              {entity.name}
            </button>
            <button
              className="text-primary"
              onClick={(e) => handleEdit(e, entity)}
            >
              <MdModeEdit />
            </button>
          </>
        ))}
        <div className="text-center mt-4">
          <button onClick={() => setShowModal(true)}>
            <IoMdAddCircleOutline className=" text-primary text-2xl" />
          </button>
        </div>
      </div>
      {!!showModal && (
        <EntityFormModal close={handleModalClose} entity={editingEntity} />
      )}
    </>
  );
};

export default Entities;

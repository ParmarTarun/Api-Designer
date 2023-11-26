import { entityType } from "@/models/Entity";
import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import EntityFormModal from "./EntityFormModal";
import { useCurrentCollection } from "@/context/currentCollection";
import MenuOptions from "./menuOptions";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { menuOption } from "@/types";
import { deleteEntity } from "@/lib/apiCall";

interface entitiesProps {}

const Entities = ({}: entitiesProps) => {
  const {
    currentCollection,
    currentEntityIndex,
    setCurrentEntityIndex,
    removeEntity,
  } = useCurrentCollection();
  const [showModal, setShowModal] = useState(false);
  const [editingEntity, setEditingEntity] = useState<entityType | undefined>();

  const handleModalClose = () => {
    setEditingEntity(undefined);
    setShowModal(false);
  };

  const handleEdit = (id: string) => {
    const ent = currentCollection.entities.find((en) => en.id === id);
    setEditingEntity(ent);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    const ent = currentCollection.entities.find((en) => en.id === id);
    if (!confirm("Are you sure:")) return;
    deleteEntity(id)
      .then(() => removeEntity(ent as entityType))
      .catch((e) => {
        alert(e.response.data.message);
        console.log(e);
      });
  };
  const menuOptions: menuOption[] = [
    {
      name: "Edit",
      icon: <MdModeEdit />,
      callback: (id) => handleEdit(id),
    },
    {
      name: "Delete",
      icon: <MdDelete className="text-error" />,
      callback: handleDelete,
    },
  ];

  return (
    <>
      <h5 className="mb-1">Entites:</h5>
      <div className="flex items-center gap-4 text-secondary">
        {currentCollection.entities.map((entity, i) => (
          <div
            key={i}
            className={`bg-primary flex items-center rounded-md pl-4 py-1 border-2 cursor-pointer ${
              currentCollection.entities[currentEntityIndex]?.id === entity.id
                ? "border-darkHighlight"
                : "dark-transparent"
            }`}
            onClick={() => setCurrentEntityIndex(i)}
          >
            {entity.name}
            <MenuOptions options={menuOptions} id={entity.id} />
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

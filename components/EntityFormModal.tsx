import React, { useState } from "react";
import Modal from "./Modal";
import { IoMdClose } from "react-icons/io";
import { entityBody } from "@/types";
import { entityType } from "@/models/Entity";
import { useCurrentCollection } from "@/context/currentCollection";
import { patchEntity, postEntity } from "@/lib/apiCall";

interface entityFormModalProps {
  entity?: entityType;
  close: () => void;
}

const EntityFormModal = ({ entity, close }: entityFormModalProps) => {
  const { currentCollection, addEntity, updateEntity } = useCurrentCollection();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<entityBody>({
    name: entity?.name || "",
    collectionId: currentCollection.id,
    requests: entity?.requests || [],
  });

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!entity?.id) return;
    setError("");
    e.preventDefault();
    patchEntity(entity.id, formData)
      .then(({ entity }) => {
        updateEntity(entity);
        close();
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setError("");
    e.preventDefault();
    postEntity(formData)
      .then(({ entity }) => {
        addEntity(entity);
        close();
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  return (
    <Modal>
      <div className="text-left bg-secondary rounded-md w-2/5">
        <div className="bg-primary text-secondary px-4 py-2 flex items-center justify-between">
          <h4>New Entity</h4>
          <button onClick={close}>
            <IoMdClose />
          </button>
        </div>
        <form className="p-4">
          <div className="grid grid-cols-6 items-center">
            <label htmlFor="collection-name" className="text-right mr-2">
              Name:
            </label>
            <input
              type="text"
              className="basic-input col-span-2"
              placeholder="New Collection"
              name="name"
              value={formData.name}
              onChange={handleFormInput}
            />
          </div>
          {error && <p className="text-center text-error mt-4">{error}</p>}
          <div className="text-right font-medium mt-4">
            <button
              className="border px-2 py-1 rounded-md bg-white mr-2"
              onClick={close}
              type="button"
            >
              CANCEL
            </button>
            {entity ? (
              <button
                className="border px-2 py-1 rounded-md bg-lightHighlight"
                onClick={handleUpdate}
              >
                UPDATE
              </button>
            ) : (
              <button
                className="border px-2 py-1 rounded-md bg-lightHighlight"
                onClick={handleSave}
              >
                SAVE
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EntityFormModal;

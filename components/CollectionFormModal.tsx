import React, { useState } from "react";
import Modal from "./Modal";
import { IoMdClose } from "react-icons/io";
import { collectionBody } from "@/types";
import { useCollection } from "@/context/collection";
import { postCollection } from "@/lib/apiCall";

interface collectionFormModalProps {
  close: () => void;
}

const CollectionFormModal = ({ close }: collectionFormModalProps) => {
  const { collections, setCollections } = useCollection();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState<collectionBody>({
    name: "",
    baseUrl: "",
  });

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setError("");
    e.preventDefault();
    postCollection(formData)
      .then(({ collection }) => {
        setCollections([collection, ...collections]);
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
          <h4>New Collection</h4>
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
          <div className="grid grid-cols-6 items-center mt-2">
            <label htmlFor="collection-url" className="text-right mr-2">
              Base URL:
            </label>
            <input
              type="text"
              className="basic-input col-span-2"
              placeholder="https://newcollection.com/api"
              name="baseUrl"
              value={formData.baseUrl}
              onChange={handleFormInput}
            />
          </div>
          {error && <p className="text-center text-error mt-4">{error}</p>}
          <div className="text-right font-medium mt-4">
            <button
              className="border px-2 py-1 rounded-md bg-white mr-2"
              onClick={close}
            >
              CANCEL
            </button>
            <button
              className="border px-2 py-1 rounded-md bg-lightHighlight"
              onClick={handleSave}
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CollectionFormModal;

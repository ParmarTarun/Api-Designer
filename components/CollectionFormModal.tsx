import React from "react";
import Modal from "./Modal";
import { IoMdClose } from "react-icons/io";

interface collectionFormModalProps {
  close: () => void;
}

const CollectionFormModal = ({ close }: collectionFormModalProps) => {
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
            />
          </div>
          <div className="text-right font-medium mt-4">
            <button
              className="border px-2 py-1 rounded-md bg-white mr-2"
              onClick={close}
            >
              CANCEL
            </button>
            <button
              className="border px-2 py-1 rounded-md bg-lightHighlight"
              // onClick={() => close()}
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

import { requestType } from "@/models/Request";
import { requestBody } from "@/types";
import { useState } from "react";
import Modal from "./Modal";
import { IoMdClose } from "react-icons/io";
import { postRequest } from "@/lib/apiCall";
import { useCurrentCollection } from "@/context/currentCollection";

interface requestFormModalProps {
  request?: requestType;
  entityId: string;
  close: () => void;
}

const RequestFormModal = ({
  request,
  entityId,
  close,
}: requestFormModalProps) => {
  const [error, setError] = useState("");
  const { addRequest } = useCurrentCollection();
  const [formData, setFormData] = useState<requestBody>({
    name: request?.name || "",
    path: request?.path || "",
    method: request?.method || "",
    entityId: entityId,
  });

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   if (!collection?.id) return;
  //   setError("");
  //   e.preventDefault();
  //   patchCollection(collection.id, formData)
  //     .then(({ collection }) => {
  //       const updatedCollections = collections.filter(
  //         (coll) => coll.id !== collection.id
  //       );
  //       setCollections([collection, ...updatedCollections]);
  //       close();
  //     })
  //     .catch((e) => {
  //       setError(e.response.data.message);
  //     });
  // };
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setError("");
    e.preventDefault();
    postRequest(formData)
      .then(({ request }) => {
        addRequest(entityId, request);
        close();
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data.message);
      });
  };

  return (
    <Modal>
      <div className="text-left bg-secondary rounded-md w-2/5">
        <div className="bg-primary text-secondary px-4 py-2 flex items-center justify-between">
          <h4>New Request</h4>
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
              placeholder="New Request"
              name="name"
              value={formData.name}
              onChange={handleFormInput}
            />
          </div>
          <div className="grid grid-cols-6 items-center mt-2">
            <label htmlFor="collection-url" className="text-right mr-2">
              Method:
            </label>
            <input
              type="text"
              className="basic-input col-span-2"
              placeholder="POST"
              name="method"
              value={formData.method}
              onChange={handleFormInput}
            />
          </div>
          <div className="grid grid-cols-6 items-center mt-2">
            <label htmlFor="collection-url" className="text-right mr-2">
              Path:
            </label>
            <input
              type="text"
              className="basic-input col-span-2"
              placeholder="/product"
              name="path"
              value={formData.path}
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
            {request ? (
              <button
                className="border px-2 py-1 rounded-md bg-lightHighlight"
                // onClick={handleUpdate}
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

export default RequestFormModal;

import { requestType } from "@/models/Request";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

interface requestDetailsProps {
  cRequest: requestType;
}

const RequestDetails = ({ cRequest }: requestDetailsProps) => {
  const [request, setRequest] = useState(cRequest);

  useEffect(() => setRequest(cRequest), [cRequest]);

  const handleFormInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setRequest({
      ...request,
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

  // const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   setError("");
  //   e.preventDefault();
  //   postRequest(formData)
  //     .then(({ request }) => {
  //       addRequest(entityId, request);
  //       close();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       setError(e.response.data.message);
  //     });
  // };

  return (
    <>
      <div className="mb-4">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          className="basic-input ml-4"
          value={request.name}
          onChange={handleFormInput}
        />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="grid grid-cols-8 border border-primary rounded-md flex-grow">
          <div className="col-span-1 pl-4 py-2 text-secondary bg-primary border-r border-primary flex">
            <select
              name="method"
              className="text-xl bg-transparent focus:outline-none outline-none cursor-pointer border border-primary"
              value={request.method}
              defaultValue={request.method}
              onChange={handleFormInput}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div className="col-span-7 flex">
            <input
              type="text"
              placeholder="/products"
              name="path"
              className="bg-transparent w-full px-2 focus:outline-none text-lg"
              value={request.path}
              onChange={handleFormInput}
            />
          </div>
        </div>
        <div className="text-4xl">
          <button className="p-1 text-error">
            <MdDelete />
          </button>
        </div>
      </div>
      <div className="mb-4">
        {request.id ? (
          <button className="btn-secondary">Update</button>
        ) : (
          <button className="btn-darkHighlight">Create</button>
        )}
      </div>
    </>
  );
};

export default RequestDetails;

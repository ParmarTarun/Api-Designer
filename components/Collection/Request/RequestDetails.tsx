import { useCurrentCollection } from "@/context/currentCollection";
import { deleteRequest, patchRequest, postRequest } from "@/lib/apiCall";
import { isNewRequest, reqMethodColorMap } from "@/lib/utils";
import { requestType } from "@/models/Request";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BounceLoader } from "react-spinners";
import RequestBody from "./RequestBody/RequestBody";
import ResponseBody from "./ResponseBody/ResponseBody";

interface requestDetailsProps {
  cRequest: requestType;
}

const RequestDetails = ({ cRequest }: requestDetailsProps) => {
  const [request, setRequest] = useState(cRequest);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const isNew = isNewRequest(cRequest.id); // check if its a new request or saved request
  const {
    currentCollection,
    currentEntityIndex,
    addRequest,
    updateRequest,
    removeRequest,
  } = useCurrentCollection();

  useEffect(() => setRequest(cRequest), [cRequest]);

  const handleFormInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { name, path, method } = request;
    const data = {
      name,
      path,
      method,
      entityId: currentCollection.entities[currentEntityIndex].id,
    };
    setIsUpdating(true);
    patchRequest(request.id, data)
      .then(({ request }) => {
        updateRequest(request);
      })
      .catch((e) => {
        console.log(e);
        alert("Failed to update the request");
      })
      .finally(() => setIsUpdating(false));
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { name, path, method } = request;
    const data = {
      name,
      path,
      method,
      entityId: currentCollection.entities[currentEntityIndex].id,
    };
    setIsUpdating(true);
    postRequest(data)
      .then(({ request }) => {
        removeRequest(request);
        addRequest(data.entityId, request);
      })
      .catch((e) => {
        alert("Failed to save request");
        console.log(e);
      })
      .finally(() => setIsUpdating(false));
  };

  const handleDelete = () => {
    if (!confirm("Are you sure?")) return;
    // delete the unsaved request from context
    if (isNew) {
      removeRequest(request);
      return;
    }
    // delete a saved request from server
    setIsDeleting(true);
    deleteRequest(request.id)
      .then((_) => removeRequest(request))
      .catch((e) => {
        alert("failed to delete request");
        console.log(e);
      })
      .finally(() => setIsDeleting(false));
  };
  // keep of track of user changes to requests
  const isChanged = JSON.stringify(cRequest) !== JSON.stringify(request);

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
      <div className="flex gap-2">
        <div className="grid grid-cols-8 border border-primary rounded-md flex-grow">
          <div className="col-span-1 text-secondary bg-primary border-r border-primary">
            <select
              name="method"
              className="text-xl bg-primary px-2 py-1 focus:outline-none outline-none cursor-pointer w-full h-full"
              value={request.method}
              onChange={handleFormInput}
            >
              {Object.entries(reqMethodColorMap).map(([method, color], i) => (
                <option value={method} style={{ color: color }} key={i}>
                  {method}
                </option>
              ))}
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
          {isDeleting ? (
            <BounceLoader size={44} color="red" />
          ) : (
            <button className="p-1 text-error" onClick={handleDelete}>
              <MdDelete />
            </button>
          )}
        </div>
      </div>
      <div className="">
        <RequestBody
          body={request.body}
          authorizations={request.authorization}
          headers={request.headers}
          params={request.params}
        />
      </div>
      <div className="mb-4">
        <ResponseBody />
      </div>
      <div className="mb-4">
        {isUpdating && <BounceLoader className="loader-primary" size={44} />}
        {!isUpdating && isNew && (
          <button className="btn-darkHighlight" onClick={handleSave}>
            Create
          </button>
        )}
        {!isUpdating && !isNew && isChanged && (
          <>
            <button className="btn-secondary mr-2" onClick={handleUpdate}>
              Update
            </button>
            <button
              className="btn-primary"
              onClick={() => setRequest(cRequest)}
            >
              Reset
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default RequestDetails;

import { useCurrentCollection } from "@/context/currentCollection";
import { deleteRequest, patchRequest, postRequest } from "@/lib/apiCall";
import { addParamsToPath, isNewRequest } from "@/lib/utils";
import { requestType } from "@/models/Request";
import React, { FC, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BounceLoader } from "react-spinners";
import RequestMethodAndPath from "./RequestBody/RequestMethodAndPath";
import RequestTabs from "./RequestBody/RequestTabs";
import Response from "./ResponseBody/Response";

interface singleRequestProps {
  cRequest: requestType;
}

const SingleRequest: FC<singleRequestProps> = ({ cRequest }) => {
  const {
    currentCollection,
    currentEntityIndex,
    addRequest,
    updateRequest,
    removeRequest,
  } = useCurrentCollection();
  const [request, setRequest] = useState(cRequest);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const isNew = isNewRequest(cRequest.id); // check if its a new request or saved request

  useEffect(() => setRequest(cRequest), [cRequest]);

  const handleRequestChange = (key: string, value: any) => {
    if (key === "params") {
      // update path as well incase of param update
      setRequest({
        ...request,
        params: value,
        path: addParamsToPath(request.path, value),
      });
    } else {
      setRequest({
        ...request,
        [key]: value,
      });
    }
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { name, path, method, params, body, headers, authorization } =
      request;
    const data = {
      name,
      path,
      method,
      params,
      body,
      headers,
      authorization,
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
    const { name, path, method, params, body, headers, authorization } =
      request;
    const data = {
      name,
      path,
      method,
      params,
      body,
      headers,
      authorization,
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
          onChange={(e) => handleRequestChange("name", e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <RequestMethodAndPath
          path={request.path}
          method={request.method}
          handleRequestChange={handleRequestChange}
        />
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
        <RequestTabs
          body={request.body}
          authorization={request.authorization}
          headers={request.headers}
          params={request.params}
          handleRequestChange={handleRequestChange}
        />
      </div>
      <div className="mb-4">
        <Response />
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

export default SingleRequest;

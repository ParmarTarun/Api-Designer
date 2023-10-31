import { reqMethodColorMap } from "@/lib/utils";
import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import RequestFormModal from "./RequestFormModal";
import { entityType } from "@/models/Entity";
import { useCurrentCollection } from "@/context/currentCollection";

interface requestsProps {}

const Requests = ({}: requestsProps) => {
  const {
    currentCollection,
    currentEntityIndex,
    currentRequestIndex,
    setCurrentRequestIndex,
  } = useCurrentCollection();
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const requests =
    currentCollection.entities[currentEntityIndex]?.requests || [];

  return (
    <div className="my-2">
      <h5 className="mb-1">Requests:</h5>
      <div className="grid grid-cols-5">
        <div className="col-span-1 bg-primary ">
          <div className="text-secondary my-4">
            {requests.map((req, i) => {
              const backgroundClass =
                currentRequestIndex === i
                  ? "bg-lightHighlight text-primary "
                  : "";
              return (
                <div
                  className={`${backgroundClass} cursor-pointer`}
                  key={i}
                  onClick={() => setCurrentRequestIndex(i)}
                >
                  <h6 className="py-2 pl-2 pr-4 grid grid-cols-4 font-semibold">
                    <span
                      className="col-span-1 text-right mr-2 "
                      style={{
                        color: `${reqMethodColorMap[req.method]}`,
                      }}
                    >
                      {req.method}:
                    </span>
                    <span className="col-span-3">{req.name}</span>
                  </h6>
                </div>
              );
            })}
            <div className="text-center mt-4">
              <button onClick={() => setShowModal(true)}>
                <IoMdAddCircleOutline className=" text-secondary text-2xl" />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-4 px-4">
          {requests[currentRequestIndex] && (
            <div className="grid grid-cols-8 border border-primary rounded-md">
              <div className="col-span-1 pl-4 py-2 text-secondary bg-primary border-r border-primary">
                <select
                  name="method"
                  className="text-2xl bg-transparent focus:outline-none"
                  value={requests[currentRequestIndex].method}
                  onChange={() => {}}
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
                  className="bg-transparent w-full px-2 focus:outline-none text-lg"
                  value={requests[currentRequestIndex].path}
                  onChange={() => {}}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {!!showModal && (
        <RequestFormModal
          close={handleModalClose}
          request={undefined}
          entityId={currentCollection.entities[currentEntityIndex].id}
        />
      )}
    </div>
  );
};

export default Requests;

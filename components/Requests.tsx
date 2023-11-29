import { reqMethodColorMap } from "@/lib/utils";
import React, { FC, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useCurrentCollection } from "@/context/currentCollection";
import RequestForm from "./RequestDetails";
import { WiMoonAltNew } from "react-icons/wi";

interface requestsProps {}

const Requests: FC<requestsProps> = ({}) => {
  const {
    currentCollection,
    currentEntityIndex,
    currentRequestIndex,
    addRequest,
    setCurrentRequestIndex,
  } = useCurrentCollection();

  const [editable, setEditable] = useState(false);

  const addNewRequest = () => {
    addRequest(currentCollection.entities[currentEntityIndex].id, {
      id: "",
      method: "GET",
      name: "New Request",
      path: "/",
      createdAt: "",
    });
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
                  <div className="py-2 pl-2 pr-4 grid grid-cols-5 font-semibold">
                    <h6
                      className="col-span-1 text-right mr-2 "
                      style={{
                        color: `${reqMethodColorMap[req.method]}`,
                      }}
                    >
                      {req.method}:
                    </h6>
                    <h6 className="col-span-3">{req.name}</h6>
                    <h6 className="col-span-1 flex justify-end items-center text-darkHighlight">
                      <WiMoonAltNew />
                    </h6>
                  </div>
                </div>
              );
            })}
            <div className="text-center mt-4">
              <button onClick={addNewRequest}>
                <IoMdAddCircleOutline className=" text-secondary text-2xl" />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-4 px-4">
          {requests[currentRequestIndex] && (
            <RequestForm cRequest={requests[currentRequestIndex]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;

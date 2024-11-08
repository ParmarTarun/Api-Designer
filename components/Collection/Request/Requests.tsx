import {
  isNewRequest,
  getNewRequestWithDefaults,
  reqMethodColorMap,
} from "@/lib/utils";
import React, { FC } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useCurrentCollection } from "@/context/currentCollection";
import { WiMoonAltNew } from "react-icons/wi";
import SingleRequest from "./SingleRequest";

interface requestsProps {}

const Requests: FC<requestsProps> = ({}) => {
  const {
    currentCollection,
    currentEntityIndex,
    currentRequestIndex,
    addRequest,
    setCurrentRequestIndex,
  } = useCurrentCollection();

  const addNewRequest = () => {
    const newId =
      "local_" +
      currentCollection.entities[currentEntityIndex].requests.length.toString();
    addRequest(
      currentCollection.entities[currentEntityIndex].id,
      getNewRequestWithDefaults(newId)
    );
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
                    <p
                      className="col-span-2 text-right text-xl"
                      style={{
                        color: `${reqMethodColorMap[req.method]}`,
                      }}
                    >
                      {req.method} :
                    </p>
                    <p className="col-span-3 flex justify-between ml-1 text-xl">
                      {req.name}
                      {isNewRequest(req.id) && (
                        <span className="col-span-1 flex justify-end items-center text-darkHighlight">
                          <WiMoonAltNew />
                        </span>
                      )}
                    </p>
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
          {requests[currentRequestIndex] ? (
            <SingleRequest cRequest={requests[currentRequestIndex]} />
          ) : (
            <p className="italic">
              Select/Create a request to display the details
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;

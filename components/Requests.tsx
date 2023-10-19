import { reqMethodColorMap } from "@/lib/utils";
import { requestBody } from "@/types";
import React, { useState } from "react";

const Requests = () => {
  const requests: requestBody[] = [
    { name: "Fetch all products", method: "GET", path: "/products" },
    { name: "Remove a product", method: "DELETE", path: "/products" },
    { name: "Fetch a product", method: "GET", path: "/product/:pId" },
    { name: "Create a product", method: "POST", path: "/products" },
    { name: "Update a product", method: "PATCH", path: "/products/:pId" },
    { name: "Remove a service", method: "DELETE", path: "/services/:sId" },
    { name: "Fetch a service", method: "GET", path: "/service/:sId" },
    { name: "Update a service", method: "PATCH", path: "/services/:sId" },
    { name: "Create a service", method: "POST", path: "/services" },
    { name: "Fetch all services", method: "GET", path: "/services" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedReq = requests[selectedIndex];
  return (
    <div className="my-2">
      <h5 className="mb-1">Requests:</h5>
      <div className="grid grid-cols-5">
        <div className="col-span-1  bg-primary ">
          <div className="text-secondary my-4">
            {requests.map((req, i) => {
              const backgroundClass =
                selectedIndex === i ? "bg-lightHighlight text-primary " : "";
              return (
                <div
                  className={`${backgroundClass} cursor-pointer`}
                  key={i}
                  onClick={() => setSelectedIndex(i)}
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
          </div>
        </div>
        <div className="col-span-4 px-4">
          <div className="grid grid-cols-8 border border-primary rounded-md">
            <div className="col-span-1 pl-4 py-2 text-secondary bg-primary border-r border-primary">
              <select
                name="method"
                className="text-2xl bg-transparent focus:outline-none"
                defaultValue={selectedReq.method}
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
                defaultValue={selectedReq.path}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;

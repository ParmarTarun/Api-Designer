import { param } from "@/types";
import React, { FC } from "react";

interface paramsProps {
  params: param[];
}

const Params: FC<paramsProps> = ({ params }) => {
  return (
    <>
      <div className="grid grid-cols-3 border-b border-primary">
        <h6 className="col-span-1">Key</h6>
        <h6 className="col-span-1">Value</h6>
        <h6 className="col-span-1">Description</h6>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          {params.map((p, i) => (
            <h6 key={i}>{p["key"]}</h6>
          ))}
        </div>
        <div className="col-span-1">
          {params.map((p, i) => (
            <h6 key={i}>{p["value"]}</h6>
          ))}
        </div>
        <div className="col-span-1">
          {params.map((p, i) => (
            <h6 key={i}>{p["desc"]}</h6>
          ))}
        </div>
      </div>
    </>
  );
};

export default Params;

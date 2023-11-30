import { header } from "@/types";
import React, { FC } from "react";

interface headersProps {
  headers: header[];
}

const Headers: FC<headersProps> = ({ headers }) => {
  return (
    <>
      <div className="grid grid-cols-3 border-b border-primary">
        <h6 className="col-span-1">Key</h6>
        <h6 className="col-span-1">Value</h6>
        <h6 className="col-span-1">Description</h6>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          {headers.map((h, i) => (
            <h6 key={i}>{h["key"]}</h6>
          ))}
        </div>
        <div className="col-span-1">
          {headers.map((h, i) => (
            <h6 key={i}>{h["value"]}</h6>
          ))}
        </div>
        <div className="col-span-1">
          {headers.map((h, i) => (
            <h6 key={i}>{h["desc"]}</h6>
          ))}
        </div>
      </div>
    </>
  );
};

export default Headers;

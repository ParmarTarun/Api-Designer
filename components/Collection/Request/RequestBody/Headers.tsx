import React from "react";

const Headers = () => {
  const params = [
    { key: "Accept", value: "*/*", desc: "" },
    { key: "User-Agent", value: "ApiDesigner/1.0", desc: "" },
    { key: "Cache-Control", value: "no-cache", desc: "" },
  ];
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

export default Headers;

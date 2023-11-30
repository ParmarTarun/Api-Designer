import React from "react";

const Params = () => {
  const params = [
    { key: "query1", value: "value1", desc: "" },
    { key: "query2", value: "value2", desc: "" },
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

export default Params;

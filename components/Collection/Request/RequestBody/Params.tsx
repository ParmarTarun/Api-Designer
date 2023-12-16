import { param } from "@/types";
import React, { FC, useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";

interface paramsProps {
  params: param[];
  handleRequestChange: (k: string, v: any) => void;
}

const Params: FC<paramsProps> = ({ params: params, handleRequestChange }) => {
  const addNewParam = () => {
    handleRequestChange("params", [
      ...params,
      { key: "", value: "", desc: "" },
    ]);
  };

  const removeParam = (ind: number) => {
    const updatedParams = params.filter((p, i) => i !== ind);
    handleRequestChange("params", updatedParams);
  };

  const handleParamChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ind: number
  ) => {
    const updatedParams = params.map((p, i) => {
      if (i === ind) {
        return { ...p, [e.target.name]: e.target.value };
      }
      return p;
    });
    handleRequestChange("params", updatedParams);
  };
  return (
    <>
      <div className="grid grid-cols-3 border-b border-primary uppercase font-semibold">
        <h6 className="col-span-1">Key</h6>
        <h6 className="col-span-1">Value</h6>
        <h6 className="col-span-1">Description</h6>
      </div>
      <div className="grid grid-cols-3 py-2 text-lg">
        <div className="col-span-1">
          {params.map((p, i) => (
            <input
              key={i}
              type="text"
              name="key"
              className="basic-input"
              value={p["key"]}
              onChange={(e) => handleParamChange(e, i)}
            />
          ))}
        </div>
        <div className="col-span-1">
          {params.map((p, i) => (
            <input
              key={i}
              type="text"
              name="value"
              className="basic-input"
              value={p["value"]}
              onChange={(e) => handleParamChange(e, i)}
            />
          ))}
        </div>
        <div className="col-span-1">
          {params.map((p, i) => (
            <div key={i}>
              <input
                type="text"
                className="basic-input"
                name="desc"
                value={p["desc"]}
                onChange={(e) => handleParamChange(e, i)}
              />

              <MdCancel
                className="inline ml-4 text-2xl text-error cursor-pointer"
                onClick={() => removeParam(i)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center my-4">
        <button className="" onClick={addNewParam}>
          <IoMdAddCircleOutline className="text-2xl" />
        </button>
      </div>
    </>
  );
};

export default Params;

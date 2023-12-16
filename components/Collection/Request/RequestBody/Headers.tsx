import { header } from "@/types";
import React, { FC, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";

interface headersProps {
  headers: header[];
  handleRequestChange: (k: string, v: any) => void;
}

const Headers: FC<headersProps> = ({ headers, handleRequestChange }) => {
  const addNewHeader = () => {
    handleRequestChange("headers", [
      ...headers,
      { key: "", value: "", desc: "" },
    ]);
  };

  const removeParam = (ind: number) => {
    const updatedHeaders = headers.filter((h, i) => i !== ind);
    handleRequestChange("headers", updatedHeaders);
  };

  const handlerHeaderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ind: number
  ) => {
    const updatedHeaders = headers.map((h, i) => {
      if (i === ind) {
        return { ...h, [e.target.name]: e.target.value };
      }
      return h;
    });
    handleRequestChange("headers", updatedHeaders);
  };
  return (
    <>
      <div className="grid grid-cols-3 border-b border-primary">
        <h6 className="col-span-1">Key</h6>
        <h6 className="col-span-1">Value</h6>
        <h6 className="col-span-1">Description</h6>
      </div>
      <div className="grid grid-cols-3 py-2 text-lg">
        <div className="col-span-1">
          {headers.map((h, i) => (
            <input
              key={i}
              type="text"
              name="key"
              className="basic-input"
              value={h["key"]}
              onChange={(e) => handlerHeaderChange(e, i)}
            />
          ))}
        </div>
        <div className="col-span-1">
          {headers.map((h, i) => (
            <input
              key={i}
              type="text"
              name="value"
              className="basic-input"
              value={h["value"]}
              onChange={(e) => handlerHeaderChange(e, i)}
            />
          ))}
        </div>
        <div className="col-span-1">
          {headers.map((h, i) => (
            <div key={i}>
              <input
                type="text"
                className="basic-input"
                name="desc"
                value={h["desc"]}
                onChange={(e) => handlerHeaderChange(e, i)}
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
        <button className="" onClick={addNewHeader}>
          <IoMdAddCircleOutline className="text-2xl" />
        </button>
      </div>
    </>
  );
};

export default Headers;

import { reqMethodColorMap } from "@/lib/utils";
import { requestType } from "@/models/Request";
import React, { FC } from "react";

interface requestMethodAndPathProps {
  request: requestType;
  handleFormInput: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}

const RequestMethodAndPath: FC<requestMethodAndPathProps> = ({
  request,
  handleFormInput,
}) => {
  return (
    <div className="grid grid-cols-8 border border-primary rounded-md flex-grow">
      <div className="col-span-1 text-secondary bg-primary border-r border-primary">
        <select
          name="method"
          className="text-xl bg-primary px-2 py-1 focus:outline-none outline-none cursor-pointer w-full h-full"
          value={request.method}
          onChange={handleFormInput}
        >
          {Object.entries(reqMethodColorMap).map(([method, color], i) => (
            <option value={method} style={{ color: color }} key={i}>
              {method}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-7 flex">
        <input
          type="text"
          placeholder="/products"
          name="path"
          className="bg-transparent w-full px-2 focus:outline-none text-lg"
          value={request.path}
          onChange={handleFormInput}
        />
      </div>
    </div>
  );
};

export default RequestMethodAndPath;

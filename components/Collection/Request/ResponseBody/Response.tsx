import React, { FC } from "react";
import Body from "./Body";
import { response } from "@/types";

interface responseProps {
  response: response;
  handleRequestChange: (k: string, v: string) => void;
}

const Response: FC<responseProps> = ({ response, handleRequestChange }) => {
  return (
    <div className="">
      <div className="flex justify-between items-center pl-4 py-2">
        <h6 className="font-semibold uppercase">Response</h6>
        <p>
          <span>Status: {response.status}</span>
        </p>
      </div>
      <div className="bg-lightHighlight p-2 pl-4">
        {/* TODO: Send only the content not whole response */}
        <Body response={response} handleRequestChange={handleRequestChange} />
      </div>
    </div>
  );
};

export default Response;

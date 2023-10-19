import React from "react";
import { MdContentCopy } from "react-icons/md";

interface baseUrlProps {
  baseUrl: string;
}

const BaseUrl = ({ baseUrl }: baseUrlProps) => {
  return (
    <div className="my-3">
      <h5 className="mb-1">Base Url:</h5>

      <div className="flex items-center">
        <code className="bg-lightHighlight px-4 py-2 rounded-md w-min">
          {baseUrl}
        </code>
        <MdContentCopy className="inline ml-4 cursor-pointer" />
      </div>
    </div>
  );
};

export default BaseUrl;

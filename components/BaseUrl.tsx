import React from "react";
import { MdContentCopy } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";
interface baseUrlProps {
  baseUrl: string;
}

const BaseUrl = ({ baseUrl }: baseUrlProps) => {
  return (
    <div className="my-3">
      <h5 className="mb-1">Base Url:</h5>

      <div className="flex items-center">
        <Link
          href={baseUrl}
          target="_blank"
          className="bg-lightHighlight px-4 py-2 rounded-md italic text-lg"
        >
          <FiExternalLink className="inline" /> {baseUrl}
        </Link>
        <MdContentCopy className="inline ml-4 cursor-pointer" />
      </div>
    </div>
  );
};

export default BaseUrl;

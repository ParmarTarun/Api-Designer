import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";
interface baseUrlProps {
  baseUrl: string;
}

const BaseUrl = ({ baseUrl }: baseUrlProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(baseUrl);
    setTimeout(() => setCopied(false), 3000);
  };

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
        <div className="ml-4">
          {copied ? (
            <p className="italic">Copied to clipboard!</p>
          ) : (
            <MdContentCopy
              className="inline cursor-pointer"
              onClick={handleCopy}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseUrl;

import { authorization } from "@/types";
import React, { FC, useState } from "react";

const NoAuthElement: FC = () => {
  return <></>;
};
const BearerTokenElement: FC = () => {
  return (
    <>
      <h6>Token:</h6>
      <input className="basic-input ml-4" placeholder="your token here..." />
    </>
  );
};

interface authorizationProps {
  authorization: authorization;
}

const Authorization: FC<authorizationProps> = ({ authorization }) => {
  const authOptions = [
    {
      name: "No Auth",
      value: "NO_AUTH",
      element: <NoAuthElement />,
    },
    {
      name: "Bearer Token",
      value: "BEARER_TOKEN",
      element: <BearerTokenElement />,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = authOptions.findIndex((op) => op.value === e.target.value);
    setCurrentIndex(index);
  };
  return (
    <div className="py-2">
      <div className="grid grid-cols-4 text-lg">
        <div className="col-span-1">
          <label className="text-lg mr-4">Type:</label>
          <select
            className="bg-lightHighlight border border-primary rounded-sm p-2 focus:outline-none"
            name="authType"
            value={authOptions[currentIndex]["value"]}
            onChange={handleSelectUpdate}
          >
            {authOptions.map((op, i) => (
              <option
                value={op["value"]}
                selected={op.value === authorization.type}
                key={i}
              >
                {op["name"]}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-3 flex items-center">
          {authOptions[currentIndex]["element"]}
        </div>
      </div>
    </div>
  );
};

export default Authorization;

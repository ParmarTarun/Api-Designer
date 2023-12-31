import { authTypes, authorization } from "@/types";
import React, { FC, useEffect, useState } from "react";
import { BearerTokenElement, NoAuthElement } from "./AuthElements";

interface authorizationProps {
  authorization: authorization;
  handleRequestChange: (k: string, v: any) => void;
}

const Authorization: FC<authorizationProps> = ({
  authorization,
  handleRequestChange,
}) => {
  const [currentAuthType, setCurrentAuthType] = useState<authTypes>(
    authorization["type"]
  );
  const [currentAuthValue, setCurrentAuthValue] = useState<any>(
    authorization["value"]
  );
  const handleSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentAuthType(e.target.value as authTypes);
  };
  useEffect(() => {
    handleRequestChange("authorization", {
      type: currentAuthType,
      value: currentAuthValue,
    });
  }, [currentAuthValue, currentAuthType]);

  useEffect(() => setCurrentAuthType(authorization["type"]), [authorization]);

  const authElements = {
    NO_AUTH: {
      element: (
        <NoAuthElement
          cValue={currentAuthValue}
          setCValue={setCurrentAuthValue}
        />
      ),
      name: "No Auth",
    },
    BEARER_TOKEN: {
      name: "Bearer Token",
      element: (
        <BearerTokenElement
          cValue={currentAuthValue}
          setCValue={setCurrentAuthValue}
        />
      ),
    },
  };
  return (
    <div className="py-2">
      <div className="grid grid-cols-4 text-lg">
        <div className="col-span-1">
          <label className="text-lg mr-4">Type:</label>
          <select
            className="bg-lightHighlight border border-primary rounded-sm p-2 focus:outline-none"
            name="authType"
            value={currentAuthType}
            onChange={handleSelectUpdate}
          >
            {Object.entries(authElements).map(([t, d], i) => (
              <option value={t} key={i}>
                {d["name"]}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-3 flex items-center">
          {authElements[currentAuthType]["element"]}
        </div>
      </div>
    </div>
  );
};

export default Authorization;

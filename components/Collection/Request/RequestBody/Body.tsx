import { isJson } from "@/lib/utils";
import { body } from "@/types";
import React, { FC, useState } from "react";

interface bodyProps {
  cBody: body;
}

const Body: FC<bodyProps> = ({ cBody }) => {
  const [body, setBody] = useState(cBody);

  const bodyOptions = [
    {
      type: "json",
    },
    { type: "text" },
  ];

  const [currentOption, setCurrentOption] = useState(bodyOptions[0]);

  const handleTypeUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = bodyOptions.find((op) => op.type === e.target.value);
    if (option) setCurrentOption(option);
  };

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-5">Implement an editor based on type</div>
      <div className="col-span-1 text-right">
        <select
          className="bg-primary border text-secondary border-primary rounded-sm p-2 focus:outline-none"
          name="authType"
          value={currentOption["type"]}
          onChange={handleTypeUpdate}
        >
          {bodyOptions.map(({ type }, i) => (
            <option value={type} key={i}>
              {type.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Body;

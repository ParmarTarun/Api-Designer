import React, { FC, useState } from "react";

const Body: FC = () => {
  // dummy data
  const data = {
    name: "Fetch Users",
    method: "GET",
    path: "/user",
    entityId: "6535a3f636dce07e58e34308",
  };
  const bodyOptions = [
    {
      type: "json",
      formatData: (d: Object) => JSON.stringify(d, undefined, 2),
    },
    { type: "text", formatData: (d: Object) => JSON.stringify(d) },
  ];
  const [currentOption, setCurrentOption] = useState(bodyOptions[0]);
  const handleTypeUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = bodyOptions.find((op) => op.type === e.target.value);
    if (option) setCurrentOption(option);
  };
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-5">
        <pre id={currentOption["type"]}>
          {currentOption["formatData"](data)}
        </pre>
      </div>
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

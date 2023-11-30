import React, { FC } from "react";
import Headers from "./Headers";
import Tabs from "../Tabs";
import Params from "./Params";
import Authorization from "./Authorization";
import Body from "./Body";

const RequestBody: FC = () => {
  const tabs = [
    { name: "params", element: <Params /> },
    { name: "authorization", element: <Authorization /> },
    { name: "headers", element: <Headers /> },
    { name: "body", element: <Body /> },
  ];
  return (
    <div>
      <Tabs tabs={tabs} defaultActive={3} />
    </div>
  );
};

export default RequestBody;

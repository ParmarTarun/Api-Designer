import React, { FC } from "react";
import Headers from "./Headers";
import Tabs from "../Tabs";
import Params from "./Params";
import Authorization from "./Authorization";
import Body from "./Body";
import { authorization, body, header, param } from "@/types";

interface requestTabsProps {
  body: body;
  params: param[];
  headers: header[];
  authorization: authorization;
  handleRequestChange: (k: string, v: string) => void;
}

const RequestTabs: FC<requestTabsProps> = ({
  body,
  authorization,
  headers,
  params,
  handleRequestChange,
}) => {
  const tabs = [
    {
      name: "params",
      element: (
        <Params params={params} handleRequestChange={handleRequestChange} />
      ),
    },
    {
      name: "authorization",
      element: (
        <Authorization
          authorization={authorization}
          handleRequestChange={handleRequestChange}
        />
      ),
    },
    {
      name: "headers",
      element: (
        <Headers headers={headers} handleRequestChange={handleRequestChange} />
      ),
    },
    { name: "body", element: <Body cBody={body} /> },
  ];
  return (
    <div>
      <Tabs tabs={tabs} defaultActive={0} />
    </div>
  );
};

export default RequestTabs;

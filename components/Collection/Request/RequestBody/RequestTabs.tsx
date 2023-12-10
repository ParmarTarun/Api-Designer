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
}

const RequestTabs: FC<requestTabsProps> = ({
  body,
  authorization,
  headers,
  params,
}) => {
  const tabs = [
    { name: "params", element: <Params params={params} /> },
    {
      name: "authorization",
      element: <Authorization authorization={authorization} />,
    },
    { name: "headers", element: <Headers headers={headers} /> },
    { name: "body", element: <Body cBody={body} /> },
  ];
  return (
    <div>
      <Tabs tabs={tabs} defaultActive={3} />
    </div>
  );
};

export default RequestTabs;

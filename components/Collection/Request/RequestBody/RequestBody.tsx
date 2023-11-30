import React, { FC } from "react";
import Headers from "./Headers";
import Tabs from "../Tabs";
import Params from "./Params";
import Authorization from "./Authorization";
import Body from "./Body";
import { authorization, body, header, param } from "@/types";

interface requestBodyProps {
  body: body;
  params: param[];
  headers: header[];
  authorizations: authorization[];
}

const RequestBody: FC<requestBodyProps> = ({
  body,
  authorizations,
  headers,
  params,
}) => {
  const tabs = [
    { name: "params", element: <Params params={params} /> },
    {
      name: "authorization",
      element: <Authorization authorizations={authorizations} />,
    },
    { name: "headers", element: <Headers headers={headers} /> },
    { name: "body", element: <Body body={body} /> },
  ];
  return (
    <div>
      <Tabs tabs={tabs} defaultActive={3} />
    </div>
  );
};

export default RequestBody;
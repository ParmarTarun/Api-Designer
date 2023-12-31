import React, { ReactElement, ReactNode } from "react";
import { entityType } from "./models/Entity";
import { requestType } from "./models/Request";

export type ReactChildrenProps = {
  children: ReactElement;
};

export type collectionBody = {
  name: string;
  baseUrl: string;
  entities: entityType[];
};
export type entityBody = {
  name: string;
  requests: requestType[];
  collectionId: string;
};

export type requestBody = {
  name: string;
  method: string;
  path: string;
  body: body;
  params: param[];
  authorization: authorization;
  headers: header[];
  response: response;
  entityId: string;
};
export type body = { [key: string]: string } | string;

export type response = {
  content: string;
  status: number;
};

export type param = {
  key: string;
  value: string;
  desc: string;
};

export type authorization = {
  type: "NO_AUTH" | "BEARER_TOKEN";
  value: any;
};
export type header = {
  key: string;
  value: string;
  desc: string;
};
export type menuOption = {
  name: string;
  icon: ReactNode;
  callback: (id: string) => void;
};

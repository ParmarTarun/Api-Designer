import { ReactElement } from "react";
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
  entityId: string;
};

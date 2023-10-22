import { ReactElement } from "react";
import { entityType } from "./models/Entity";

export type ReactChildrenProps = {
  children: ReactElement;
};

export type collectionBody = {
  name: string;
  baseUrl: string;
  entities: entityType[];
};

export type requestBody = {
  name: string;
  method: string;
  path: string;
};

import { ReactElement } from "react";

export type ReactChildrenProps = {
  children: ReactElement;
};

export type collectionBody = {
  name: string;
  baseUrl: string;
};

export type requestBody = {
  name: string;
  method: string;
  path: string;
};

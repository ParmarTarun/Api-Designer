import { requestType } from "@/models/Request";

export const reqMethodColorMap: { [key: string]: string } = {
  GET: "#3eb6a1",
  POST: "#FFFF66",
  PATCH: "#890EF2",
  DELETE: "#F08888",
};

export const isNewRequest = (reqId: string) => {
  return reqId.startsWith("local");
};

export const getNewRequestWithDefaults: (id: string) => requestType = (id) => {
  return {
    id,
    method: "GET",
    name: "New Request",
    path: "/",
    params: [
      { key: "query1", value: "value1", desc: "" },
      { key: "query2", value: "value2", desc: "" },
    ],
    headers: [
      { key: "Accept", value: "*/*", desc: "" },
      { key: "User-Agent", value: "ApiDesigner/1.0", desc: "" },
      { key: "Cache-Control", value: "no-cache", desc: "" },
    ],
    authorization: [
      { type: "NO_AUTH", value: "" },
      { type: "BEARER_TOKEN", value: { token: "" } },
    ],
    body: {
      name: "Fetch Users",
      method: "GET",
      path: "/user",
    },
    createdAt: "",
  };
};

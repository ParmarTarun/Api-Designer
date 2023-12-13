import { requestType } from "@/models/Request";
import { param } from "../types";

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
    params: [],
    headers: [
      { key: "Accept", value: "*/*", desc: "" },
      { key: "User-Agent", value: "ApiDesigner/1.0", desc: "" },
      { key: "Cache-Control", value: "no-cache", desc: "" },
    ],
    authorization: { type: "NO_AUTH", value: "" },
    body: {
      name: "Fetch Users",
      method: "GET",
      path: "/user",
    },
    createdAt: "",
  };
};

export const isJson = (s: string) => {
  try {
    JSON.parse(s);
    return true;
  } catch (e) {
    return false;
  }
};

export const addParamsToPath = (path: string, params: param[]) => {
  // console.log(path, params);
  let qparams = "";
  params.forEach((p) => {
    if (p.key) {
      qparams += "&" + p.key + "=" + p.value;
    }
  });
  const res = encodeURI(path.split("?")[0] + "?" + qparams);
  // console.log(res);
  return res;
};

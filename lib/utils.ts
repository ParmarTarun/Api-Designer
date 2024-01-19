import { requestType } from "@/models/Request";
import { param } from "../types";
import { collectionType } from "@/models/Collection";
import { entityType } from "@/models/Entity";

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
      { key: "Accept", value: "*/*", desc: "default" },
      { key: "User-Agent", value: "ApiDesigner/1.0", desc: "default" },
      { key: "Cache-Control", value: "no-cache", desc: "default" },
    ],
    authorization: { type: "NO_AUTH", value: "" },
    body: '{"key":"value"}',
    createdAt: "",
    response: {
      content: '{"key":"value"}',
      status: 200,
    },
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

export const beautify = (body: string) => {
  try {
    return JSON.stringify(JSON.parse(body), null, 2);
  } catch (e) {
    return false;
  }
};

export const formatRequests = (requests: requestType[]) => {
  const formatted = requests.map((req) => {
    // remove created at and update the content to json
    const {
      createdAt: _,
      id: __,
      ...rest
    } = {
      ...req,
      body: JSON.parse(req.body),
      response: {
        ...req.response,
        content: JSON.parse(req.response.content),
      },
    };
    return rest;
  });
  return formatted;
};

export const formatEntities = (entities: entityType[]) => {
  const formatted = entities.map((ent) => {
    const {
      createdAt: _,
      id: __,
      ...rest
    } = {
      ...ent,
      requests: formatRequests(ent.requests),
    };
    return rest;
  });
  return formatted;
};

export const formatCollection = (collection: collectionType) => {
  const {
    id: _,
    createdAt: __,
    ...rest
  } = {
    ...collection,
    entities: formatEntities(collection.entities),
  };
  return JSON.stringify(rest);
};

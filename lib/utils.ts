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

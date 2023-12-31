import { Entity } from "@/models/Entity";
import { mongooseConnect } from "./mongoose";
import { requestBody } from "@/types";
import { InvalidEntityId, InvalidRequestId } from "./customErrors";
import { Request, requestType } from "@/models/Request";

type getRequestsType = () => Promise<requestType[]>;
type postRequestType = (data: requestBody) => Promise<requestType>;
type patchRequestType = (id: string, data: requestBody) => Promise<requestType>;
type deleteRequestType = (id: string) => Promise<boolean>;

export const getRequests: getRequestsType = async () => {
  await mongooseConnect();
  const requestDocs = await Request.find({}, {}, { sort: { createdAt: -1 } });

  let requests: requestType[] = [];
  requestDocs.forEach((row) => {
    requests.push({
      id: row._id,
      name: row.name,
      method: row.method,
      path: row.path,
      authorization: row.authorization,
      body: row.body,
      headers: row.headers,
      params: row.params,
      response: row.response,
      createdAt: row.createdAt,
    });
  });

  return requests;
};

export const postRequest: postRequestType = async ({
  name,
  method,
  path,
  authorization,
  body,
  headers,
  response,
  params,
  entityId,
}) => {
  await mongooseConnect();
  // get entity
  const entity = await Entity.findById(entityId);
  if (!entity) throw new InvalidEntityId();
  // create request
  const request = await Request.create({
    name,
    method,
    path,
    authorization,
    body,
    response,
    headers,
    params,
  });
  // add new request Id in entity
  const res = await Entity.updateOne(
    { _id: entityId },
    { $push: { requests: request._id } }
  );

  return {
    name,
    method: request.method,
    path: request.path,
    authorization: request.authorization,
    body: request.body,
    headers: request.headers,
    params: request.params,
    response: request.response,
    createdAt: request.createdAt,
    id: request._id,
  };
};

// @ts-ignore   path is coming in as a string from request body and Literal type is expected here
export const patchRequest: patchRequestType = async (
  id,
  { name, method, path, authorization, body, headers, response, params }
) => {
  await mongooseConnect();
  const request = await Request.findByIdAndUpdate(id, {
    name,
    method,
    path,
    authorization,
    body,
    headers,
    response,
    params,
  });
  if (!request) throw new InvalidRequestId();

  return {
    name,
    method,
    path,
    authorization,
    headers,
    response,
    body,
    params,
    createdAt: request.createdAt,
    id: request._id,
  };
};

export const deleteRequest: deleteRequestType = async (id) => {
  await mongooseConnect();
  const result = await Request.findByIdAndDelete(id);

  return true;
};

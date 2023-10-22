import { Entity } from "@/models/Entity";
import { mongooseConnect } from "./mongoose";
import { requestBody } from "@/types";
import { InvalidEntityId } from "./customErrors";
import { Request, requestType } from "@/models/Request";

type getRequestsType = () => Promise<requestType[]>;
type postRequestType = (data: requestBody) => Promise<requestType>;

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
      createdAt: row.createdAt,
    });
  });

  return requests;
};

export const postRequest: postRequestType = async ({
  name,
  method,
  path,
  entityId,
}) => {
  await mongooseConnect();
  // get entity
  const entity = await Entity.findById(entityId);
  if (!entity) throw new InvalidEntityId();
  // create request
  const request = await Request.create({ name, method, path });
  // add new request Id in entity
  const res = await Entity.updateOne(
    { _id: entityId },
    { $push: { requests: request._id } }
  );

  return {
    name,
    method: request.method,
    path: request.path,
    createdAt: request.createdAt,
    id: request._id,
  };
};

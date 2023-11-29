import { collectionBody, entityBody, requestBody } from "@/types";
import axios from "axios";

// collection
export const postCollection = async (data: collectionBody) => {
  return axios
    .post(process.env.NEXT_PUBLIC_BASE_API_URL + "/collections", data)
    .then((res) => res.data);
};

export const patchCollection = async (id: string, data: collectionBody) => {
  return axios
    .patch(process.env.NEXT_PUBLIC_BASE_API_URL + "/collections/" + id, data)
    .then((res) => res.data);
};

export const deleteCollection = async (id: string) => {
  return axios
    .delete(process.env.NEXT_PUBLIC_BASE_API_URL + "/collections/" + id)
    .then((res) => res.data);
};

// entity
export const postEntity = async (data: entityBody) => {
  return axios
    .post(process.env.NEXT_PUBLIC_BASE_API_URL + "/entities", data)
    .then((res) => res.data);
};

export const patchEntity = async (id: string, data: entityBody) => {
  return axios
    .patch(process.env.NEXT_PUBLIC_BASE_API_URL + "/entities/" + id, data)
    .then((res) => res.data);
};

export const deleteEntity = async (id: string) => {
  return axios
    .delete(process.env.NEXT_PUBLIC_BASE_API_URL + "/entities/" + id)
    .then((res) => res.data);
};

// request
export const postRequest = async (data: requestBody) => {
  return axios
    .post(process.env.NEXT_PUBLIC_BASE_API_URL + "/requests", data)
    .then((res) => res.data);
};

export const patchRequest = async (id: string, data: requestBody) => {
  return axios
    .patch(process.env.NEXT_PUBLIC_BASE_API_URL + "/requests/" + id, data)
    .then((res) => res.data);
};

export const deleteRequest = async (id: string) => {
  return axios
    .delete(process.env.NEXT_PUBLIC_BASE_API_URL + "/requests/" + id)
    .then((res) => res.data);
};

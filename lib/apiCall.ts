import { collectionBody } from "@/types";
import axios from "axios";

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

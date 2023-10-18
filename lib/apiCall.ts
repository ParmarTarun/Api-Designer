import { collectionBody } from "@/types";
import axios from "axios";

export const postCollection = async (data: collectionBody) => {
  return axios
    .post(process.env.NEXT_PUBLIC_BASE_API_URL + "/collections", data)
    .then((res) => res.data);
};

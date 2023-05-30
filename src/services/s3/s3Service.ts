import { AxiosResponse } from "axios";
import axios from "./axios";

export const getS3Url = async (username: string): Promise<AxiosResponse> =>
  await axios.get(`/?username=${username}`);

export const putS3Object = async (): Promise<AxiosResponse> =>
  await axios.put("/");

export const getS3Url_cedulafecha = async (cedulafecha: string): Promise<AxiosResponse> =>
await axios.get(`/?cedulafecha=${cedulafecha}`);

export const getS3Url_cedulafechaEval = async (cedulafecha: string): Promise<AxiosResponse> =>
await axios.get(`/?cedulafechaEval=${cedulafecha}`);

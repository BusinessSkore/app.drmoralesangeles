import { Centro } from "@/interfaces/Centro";
import { AxiosResponse } from "axios";
import axios from "./axios";

export const create = async (centro: Centro): Promise<AxiosResponse> =>
  await axios.put("/create", centro);

export const getAllVal = async (): Promise<AxiosResponse> =>
  await axios.get(`/getallval`);

export const getAll = async (): Promise<AxiosResponse> =>
  await axios.get(`/getall`);
  
export const getManyByDate = async (
  fecha: string,
  id_centerKit: string
): Promise<AxiosResponse> =>
  await axios.get(`/getmanybydate?fecha=${fecha}&id_centerKit=${id_centerKit}`);

export const destroy = async (
  rncEmisor: string,
  rncReceptorFechaEmision: string
): Promise<AxiosResponse> =>
  await axios.put(
    `/destroy?rncEmisor=${rncEmisor}&rncReceptorFechaEmision=${rncReceptorFechaEmision}`
  );

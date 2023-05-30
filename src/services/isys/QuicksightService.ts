import { AxiosResponse } from "axios";
import axios from "./axios";

export const getUrl2 = async (dashboard: string): Promise<AxiosResponse> =>
  await axios.get(`/get-qs-embed-url?dashboard=${dashboard}`);

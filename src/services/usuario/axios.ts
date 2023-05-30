import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://t8z32ukzli.execute-api.us-east-1.amazonaws.com/dev/",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "bilcAwJaWxW44dpRjpkt5jNmd2DPOo53KSSEaoF0",
  },
});
export default axiosInstance;

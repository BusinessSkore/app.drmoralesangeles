import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://ksmfjsw5rg.execute-api.us-east-1.amazonaws.com/get-qs-embed-url",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;

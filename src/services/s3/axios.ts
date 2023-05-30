import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://638ttpifa2.execute-api.us-east-1.amazonaws.com/dev",
  headers: {
    "Content-Type": "application/json"
  },
});
export default axiosInstance;

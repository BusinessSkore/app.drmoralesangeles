import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://ksmfjsw5rg.execute-api.us-east-1.amazonaws.com/",
  // baseURL: "http://localhost:3000/api",

  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;

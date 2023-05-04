import axios from "axios";

const axiosBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
});

const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
});

axiosAuth.interceptors.request.use((config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export { axiosBase, axiosAuth };

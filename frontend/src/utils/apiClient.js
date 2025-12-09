import axios from "axios";

const client_endpoint = import.meta.env.VITE_CLIENT_BACKEND_ENDPOINT;
const server_endpoint = import.meta.env.VITE_SERVER_BACKEND_ENDPOINT;

export const clientInstance = axios.create({
  baseURL: client_endpoint,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const serverInstance = axios.create({
  baseURL: server_endpoint,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

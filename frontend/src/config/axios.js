import axios from "axios";

const server_endpoint = import.meta.env.VITE_SERVER_ENDPOINT;

export const axiosInstance = axios.create({
  baseURL: server_endpoint,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Attach token
    // const token = localStorage.getItem("accessToken");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log("Request:", config.baseURL + config.url);
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    console.log("AAA", status);
    const message = error.response?.data?.message || "Something went wrong";

    // Handle global behaviors here
    if (status === 401) {
      console.log("Unauthorized - redirecting to login");
      //localStorage.removeItem("token");
      //window.location.href = "/login";
    }

    // Always reject so calling code can handle it if needed
    return Promise.reject({
      status,
      message,
      raw: error,
    });
  },
);

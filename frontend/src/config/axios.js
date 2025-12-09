import { clientInstance } from "../utils/apiClient";

clientInstance.interceptors.request.use(
  (config) => {
    console.log("Request:", config.baseURL + config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

clientInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Something went wrong";

    // Handle global behaviors here
    if (status === 401) {
      console.log("Unauthorized - redirecting to login");
    }

    // Always reject so calling code can handle it if needed
    return Promise.reject({
      status,
      message,
      raw: error,
    });
  }
);

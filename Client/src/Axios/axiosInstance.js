// import axios from "axios";

// const axiosInstance=axios.create({
//     baseURL:"http://localhost:5000/api/v1"
// })

// export default axiosInstance



// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
// });

// // Automatically attach token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;


import axios from "axios";

const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const fallbackBaseURL = isLocalhost
  ? "http://localhost:5000/api/v1"
  : `${window.location.origin}/api/v1`;

const apiBaseURL = import.meta.env.VITE_API_BASE_URL || fallbackBaseURL;

if (!import.meta.env.VITE_API_BASE_URL && !isLocalhost) {
  console.warn(
    "VITE_API_BASE_URL is not set. Using same-origin fallback:",
    apiBaseURL
  );
}

const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 20000,
});

// Attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Global response error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Server took too long to respond.");
    }

    if (!error.response) {
      console.error("Network error or server might be waking up.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

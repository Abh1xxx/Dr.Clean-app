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

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  timeout: 10000, // 10 seconds timeout
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
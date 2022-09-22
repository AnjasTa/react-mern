import axios from "axios";
const token: any = localStorage.getItem("access-token");
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    // Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;

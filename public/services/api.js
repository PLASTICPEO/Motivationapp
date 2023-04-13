import axios from "axios";

const baseURL = "http://localhost:3001/compliments";

const axiosParams = {
  baseURL,
};

const axiosInstance = axios.create(axiosParams);

const api = (http) => ({
  get: (url) => http.get(url),
  post: (url, body, config) => http.post(url, body, config),
});

export default api(axiosInstance);

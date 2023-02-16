import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const clientApi = axios.create({
  baseURL,
});

export default clientApi;

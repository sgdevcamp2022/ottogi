import axios from "axios";
import { baseURL } from "../configs/url";

const clientApi = axios.create({
  baseURL,
});

export default clientApi;

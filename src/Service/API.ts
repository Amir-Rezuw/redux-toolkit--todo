import axios from "axios";
import { env } from "../Env/env";

export const _API = axios.create({
  baseURL: env.baseUrl,
});

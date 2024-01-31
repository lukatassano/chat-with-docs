import axios from "axios";

export function useAIApi() {
  return axios.create({
    baseURL: "http://localhost:3333",
  });
}

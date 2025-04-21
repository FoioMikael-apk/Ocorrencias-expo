import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.100.35:3333", // Substitua pelo seu IP real
});

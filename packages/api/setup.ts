import { OpenAPI } from "./core/OpenAPI";

OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
OpenAPI.TOKEN = async () => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") ?? "";
};
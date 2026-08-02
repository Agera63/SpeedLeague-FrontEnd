import { OpenAPI } from "./core/OpenAPI";

OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://sl-api-mu.vercel.app";
OpenAPI.TOKEN = async () => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") ?? "";
};
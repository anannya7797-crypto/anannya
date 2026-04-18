import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (r) => r,
  (error: AxiosError) => {
    // Surface a typed error; pages decide whether to fall back to mock
    return Promise.reject(error);
  }
);

/** Wrap any API call with a mock fallback so UI works pre-Django. */
export async function withFallback<T>(call: () => Promise<T>, mock: T): Promise<{ data: T; isMock: boolean }> {
  try {
    const data = await call();
    return { data, isMock: false };
  } catch {
    return { data: mock, isMock: true };
  }
}

/** Endpoints — mirror the Django REST routes. */
export const endpoints = {
  projects: "/projects/",
  blogs: "/blogs/",
  skills: "/skills/",
  timeline: "/timeline/",
  contact: "/contact/",
  aiInfer: "/ai/infer/",
};

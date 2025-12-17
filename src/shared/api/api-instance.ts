import axios, { AxiosError, AxiosRequestConfig } from "axios";

const CSRF_TOKEN_KEY = "csrftoken";
const AUTH_URLS = [
    "/auth/login/",
    "/auth/refresh_token/",
    "/auth/register/worker/",
];

export function getCookie(name: string): string | null {
  const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
}

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const isAuthUrl = (url: string) => {
    const normalizedUrl = url.startsWith("/") ? url.slice(1) : url;

    return AUTH_URLS.some((authPath) => {
        const normalizedAuthPath = authPath.startsWith("/")
            ? authPath.slice(1)
            : authPath;
        return normalizedUrl.includes(normalizedAuthPath);
    });
};

// --- Request Interceptor ---
apiInstance.interceptors.request.use(
    (config) => {
      const csrfToken = getCookie(CSRF_TOKEN_KEY);
      if (csrfToken && config.headers) {
        config.headers["X-CSRFToken"] = csrfToken;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

// Интерцептор ответов: логика обновления токена и обработка ошибок 401
apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const requestUrl = originalRequest.url || "";
        if (
            error.response?.status === 401 &&
            !originalRequest._isRetry &&
            !isAuthUrl(requestUrl)
        ) {
            originalRequest._isRetry = true;

            try {
                await apiInstance.post("/auth/refresh_token/");

                return apiInstance(originalRequest);
            } catch (refreshError) {

                console.error("Token refresh failed. Session expired, redirecting to login:", refreshError);

                // Принудительный логаут/редирект
                if (typeof window !== 'undefined') {
                    window.location.replace("/sign-in");

                }
                return Promise.resolve(null);
            }
        }
        return Promise.reject(error);
    }
);

export const createInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  return apiInstance({
    ...config,
    ...options,
  }).then((r) => r.data);
};

export type RequestOptions = Parameters<typeof createInstance>[1];

export type BodyType<Data> = Data;

export type ErrorType<Error> = AxiosError<Error>;

/*
 * Этот модуль создаёт и экспортирует универсальную обёртку для работы с API с помощью Axios.
 * * apiInstance: Экземпляр Axios с централизованными настройками, такими как базовый URL ("/api")
 * и заголовки по умолчанию ("Content-Type": "application/json"), интерцепторы.
 */
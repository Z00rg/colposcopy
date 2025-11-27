import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
// const CSRF_TOKEN_KEY = 'X-CSRFtoken';
const AUTH_URLS = ['/auth/login', '/auth/refresh_token'];

export const apiInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// //Функция куки
// function getCookie(name: string) {
//   const nameEQ = name + "=";
//   const ca = document.cookie.split(';');
  
//   for(let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) === 0) {
//       return c.substring(nameEQ.length, c.length);
//     }
//   }
//   return null;
// }

//Итерцептор запросов: добавляет Access Token в заголовки каждого запроса
apiInstance.interceptors.request.use(
  (config) => {
    // 1. Логика Access Token
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // // 2. Логика CSRF Token
    // const csrfToken = getCookie(CSRF_TOKEN_KEY);

    // if (csrfToken) {
    //   config.headers['X-CSRFtoken'] = csrfToken; 
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Функция для проверки, является ли URL аутентификационным
const isAuthUrl = (url: string) => {
    const normalizedUrl = url.startsWith('/') ? url.slice(1) : url; 
    
    return AUTH_URLS.some(authPath => {
        const normalizedAuthPath = authPath.startsWith('/') ? authPath.slice(1) : authPath;
        return normalizedUrl.includes(normalizedAuthPath);
    });
};

// Интерцептор ответов: логика обновления токена и обработка ошибок 401
apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest.url;

    // 401 (Unauthorized) и мы не пытались повторить запрос
    if (error.response.status === 401 && !originalRequest._isRetry &&
      !isAuthUrl(requestUrl)) {
      originalRequest._isRetry = true;

      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

      if (refreshToken) {
        try {
          const { data } = await apiInstance.post("/auth/refresh_token", {
            refresh_token: refreshToken,
          });

          localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);

          originalRequest.headers["Authorization"] =
            `Bearer ${data.access_token}`;

          // Повторяем исходный запрос с новым токеном
          return apiInstance(originalRequest);
        } catch (refreshError) {
          // Если обновление не удалось, то выходим
          console.error("Token refresh failed, logging out:", refreshError);

          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          window.location.href = "/sign-in";

          return Promise.reject(refreshError);
        }
      } else {
        // Если refresh_token нет, то выходим
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.location.href = "/sign-in";
      }
    }

    // Возвращаем все остальные ошибки
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
 * и заголовки по умолчанию ("Content-Type": "application/json"). Это позволяет избежать
 * дублирования кода в каждом запросе.
 *
 * createInstance: Основная функция для выполнения запросов. Она принимает конфигурацию
 * запроса и опции, объединяет их и отправляет через apiInstance. Функция возвращает
 * только полезные данные из ответа (r.data), а не весь объект ответа.
 *
 * BodyType: Вспомогательный дженерик-тип для типизации тела запросов.
 *
 * ErrorType: Вспомогательный дженерик-тип для удобной работы с ошибками Axios,
 * предоставляя доступ к деталям, таким как статус-код.
 *
 * Такой подход обеспечивает чистоту кода, переиспользуемость и строгую типизацию
 * для всех API-запросов в приложении.
 */

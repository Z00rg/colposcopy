import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const apiInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  return apiInstance({
    ...config,
    ...options,
  }).then((r) => r.data);
};

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
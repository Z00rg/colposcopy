# --- Этап 1: Установка зависимостей ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
# Ставим все зависимости (включая dev), так как они нужны для билда
RUN npm install

# --- Этап 2: Сборка ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Прокидываем переменную для вшивания в билд
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Отключаем вывод standalone в конфиге на всякий случай
RUN npm run build

# --- Этап 3: Запуск (Полноценный режим) ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Для работы npm start нам нужны почти все файлы проекта
# Копируем всё из билдера (после билда)
COPY --from=builder /app ./

# Переменная окружения для рантайма
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

EXPOSE 3000
ENV PORT=3000

# Запускаем через полноценный npm start
CMD ["npm", "run", "start"]
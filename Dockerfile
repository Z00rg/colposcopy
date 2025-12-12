# Этап 1: сборка
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY package*.json ./
RUN npm ci

# Копируем исходники и собираем
COPY . .
RUN npm run build:prod

# Этап 2: легковесный образ для запуска
FROM node:20-alpine

WORKDIR /app

# Прод зависимости
COPY package*.json ./
RUN npm ci --only=production

# Копируем готовую сборку
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Порт, который слушает Next.js
EXPOSE 3000

# Запуск
CMD ["npm", "start"]
# образ для gateway
FROM node:18.13.0-alpine AS gateway

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Создать директорию внутри контейнера
WORKDIR /usr/src/gateway

# Установить зависимости
COPY ./package*.json ./
RUN npm install --only=production

# Скопировать приложение из текущей директории в WORKDIR-директорию
COPY . .

# Скомпилировать приложение
RUN npm run build

CMD ["node", "dist/main"]
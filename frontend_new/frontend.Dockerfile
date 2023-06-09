# образ для frontend
FROM node:18-alpine

# Создать директорию внутри контейнера
WORKDIR /usr/src/frontend

# Установить зависимости
COPY ./package*.json ./
RUN npm install

# Скопировать приложение из текущей директории в WORKDIR-директорию
COPY . .

# Скомпилировать приложение
RUN npm run build

CMD ["node", ".output/server/index.mjs"]

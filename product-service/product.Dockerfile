# образ для gateway
FROM node:18

# Создать директорию внутри контейнера
WORKDIR /usr/src/product-service

# Установить зависимости
COPY ./package*.json ./
RUN npm install
RUN npm i -g @nestjs/cli

# Скопировать приложение из текущей директории в WORKDIR-директорию
COPY . .

# Скомпилировать приложение
RUN npm run build

CMD ["node", "dist/main"]

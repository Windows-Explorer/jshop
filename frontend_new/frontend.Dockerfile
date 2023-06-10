FROM node:18.16-alpine
WORKDIR /usr/src/frontend

#COPY . .
#RUN npm install
#RUN npm run generate
#RUN npm run build

COPY .output .output

CMD ["node", ".output/server/index.mjs"]
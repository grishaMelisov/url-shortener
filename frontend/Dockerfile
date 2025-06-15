FROM node:20 AS builder

WORKDIR /app
COPY frontend ./

RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

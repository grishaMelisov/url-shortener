
FROM node:20

WORKDIR /app

COPY backend/package.json backend/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY backend .

RUN yarn prisma generate

RUN yarn build

CMD ["node", "dist/main"]

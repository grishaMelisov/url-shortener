
FROM node:20

WORKDIR /app

# Копируем package.json и yarn.lock
COPY backend/package.json backend/yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем остальной исходный код
COPY backend .

# Генерируем Prisma Client внутри контейнера
RUN yarn prisma generate

# Билдим проект
RUN yarn build

# Запускаем приложение
CMD ["node", "dist/main"]

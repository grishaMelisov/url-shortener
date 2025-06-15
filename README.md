# URL Shortener — Инструкция по запуску окружения

## Требования

-   **Docker** >= 20.x
-   **Docker Compose** >= 1.29
-   **Node.js** 20.x (если собираешь фронт или бэк вне контейнера)
-   Порты `5432`, `4200`, `5173` должны быть **свободны**

---

## Структура окружения

-   `postgres` — база данных PostgreSQL
-   `backend` — NestJS + Prisma REST API
-   `frontend` — React + Tailwind (в контейнере обслуживается через nginx)

---

## Запуск проекта

Из корневой директории

```bash
docker compose up --build
```

После запуска:

-   **Frontend**: [http://localhost:5173](http://localhost:5173)
-   **Backend API**: [http://localhost:4200](http://localhost:4200)
-   **PostgreSQL**: localhost:5432 (user: `user`, password: `password`)

---

## Тестирование

Сейчас используется **одна база данных (dev)** и для разработки, и для e2e тестов.

Запуск e2e-тестов внутри контейнера:

```bash
docker-compose exec backend yarn test:e2e
```

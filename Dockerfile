# syntax=docker/dockerfile:1

# Build stage
FROM node:lts-alpine AS build

WORKDIR /

RUN npm install -g pnpm typescript

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run start:build

FROM node:lts-alpine AS prod

WORKDIR /

RUN npm install -g pnpm

COPY --from=build ./dist ./dist
COPY --from=build ./node_modules ./node_modules

EXPOSE 3000
# RUN pnpm i tsc && pnpm run start:build && pnpm run start:run
CMD ["node", "/dist/server.js"]

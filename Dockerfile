FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm prisma generate

EXPOSE 3000

CMD [ "pnpm","run","start:dev" ]

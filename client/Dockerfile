FROM node:20

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml* ./

RUN npm install -g pnpm && pnpm install

COPY src/ /usr/src/app

EXPOSE 3000

CMD ["pnpm", "run", "dev"]

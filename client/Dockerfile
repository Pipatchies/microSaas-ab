FROM node:20

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 3300

CMD ["pnpm", "run", "dev"]

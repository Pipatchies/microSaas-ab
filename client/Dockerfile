# ---------- Base ----------
FROM node:20-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat

RUN npm install -g pnpm

# ---------- Dependencies ----------
FROM base AS deps

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

# ---------- Dev ----------
FROM deps AS dev

COPY . .

EXPOSE 3300

CMD ["pnpm", "run", "dev"]

# ---------- Build ----------
FROM deps AS builder

COPY . .

RUN pnpm run build

# ---------- Prod ----------
FROM base AS prod

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3300

ENV PORT=3300
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
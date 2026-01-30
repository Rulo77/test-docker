# ---------- BUILD ----------
FROM node:18-alpine AS builder

WORKDIR /src

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# ---------- RUNTIME ----------
FROM node:18-alpine

WORKDIR /src

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /src/dist ./dist

ENV NODE_ENV=production
EXPOSE 3050

CMD ["node", "dist/index.js"]

FROM node:22-bookworm-slim AS deps

WORKDIR /app

COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

RUN npm ci

FROM deps AS build

COPY . .

RUN npm run build

FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000
ENV WHATSAPP_PROVIDER=mock

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/server ./server
COPY --from=build /app/client/dist ./client/dist

RUN mkdir -p server/storage

EXPOSE 5000

CMD ["npm", "run", "start", "--workspace", "server"]

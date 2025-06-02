# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY tsconfig.json ./
COPY src ./src
COPY swagger.yaml ./
RUN yarn build

# Runtime stage
FROM node:20-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/swagger.yaml ./swagger.yaml

CMD ["node", "dist/index.js"]

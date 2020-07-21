FROM node:12.6.0-alpine AS build
ENV NODE_ENV=development
ENV SERVER_PORT=3000
WORKDIR /app
COPY package.json package-lock*.json ./
RUN npm install 
COPY . .
RUN npm run build
RUN npm run export

FROM node:12.6.0-alpine AS prod
ENV NODE_ENV=production
EXPOSE 3000
RUN apk add --no-cache tini
WORKDIR /app
COPY package.json package-lock*.json ./
RUN npm install && npm cache clean --force
COPY --from=build /app/dist/. dist/
COPY nuxt.config.js nuxt.config.js
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "run", "serve"]
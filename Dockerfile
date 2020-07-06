FROM node:12.6.0-alpine AS build
ENV NODE_ENV=development
WORKDIR /app
COPY package.json package-lock*.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM node:12.6.0-alpine AS prod
ENV NODE_ENV=production
EXPOSE 3000
RUN apk add --no-cache tini
WORKDIR /app
COPY package.json package-lock*.json ./
RUN npm install && npm cache clean --force
COPY --from=build /app/.nuxt/. .nuxt/
COPY --from=build /app/static/. static/
COPY nuxt.config.js nuxt.config.js
COPY assets/. assets/
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "./node_modules/nuxt/bin/nuxt.js", "start"]
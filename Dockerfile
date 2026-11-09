# The full site (audience pages, Anty's intake, the inbox) as a Node server.
# Built and run by Fly; see fly.staging.toml.

FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Set from [build.args] in the fly config; staging builds pass SITE_NOINDEX=1.
ARG SITE_NOINDEX=""
ENV SITE_NOINDEX=$SITE_NOINDEX NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build /app/package.json /app/next.config.mjs ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
EXPOSE 3000
CMD ["npx", "next", "start"]

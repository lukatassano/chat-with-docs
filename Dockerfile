FROM node:18-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

FROM base AS ai
COPY --from=prod-deps /app/apps/ai/node_modules/ /app/apps/ai/node_modules
COPY --from=build /app/apps/ai/dist /app/apps/ai/dist
WORKDIR /app/apps/ai
EXPOSE 3333
CMD [ "pnpm", "start:prod"]

FROM base AS web
COPY --from=prod-deps /app/apps/web/node_modules/ /app/apps/web/node_modules
COPY --from=build /app/apps/web/.next /app/apps/web/.next
WORKDIR /app/apps/web
EXPOSE 3000
CMD [ "pnpm", "start" ]

FROM node:18-alpine AS builder

WORKDIR /workspace

RUN npm install -g pnpm

#COPY . /workspace

COPY package.json /workspace/package.json
COPY pnpm-lock.yaml /workspace/pnpm-lock.yaml

RUN pnpm install

COPY .babelrc /workspace/.babelrc
COPY postcss.config.js /workspace/postcss.config.js
COPY tailwind.config.js /workspace/tailwind.config.js
COPY tsconfig.json /workspace/tsconfig.json
COPY webpack.config.js /workspace/webpack.config.js
COPY index.ejs /workspace/index.ejs
COPY src /workspace/src

RUN pnpm run build

FROM nginx:alpine

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /workspace/dist/. /usr/share/nginx/html/app3

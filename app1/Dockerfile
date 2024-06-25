FROM node:18-alpine AS builder

WORKDIR /workspace

RUN npm install -g pnpm

COPY package.json /workspace/package.json
RUN pnpm install

#COPY . /workspace
COPY .eslintrc.json /workspace/.eslintrc.json
COPY ngsw-config.json /workspace/ngsw-config.json
COPY tsconfig.app.json /workspace/tsconfig.app.json
COPY tsconfig.json /workspace/tsconfig.json
COPY tsconfig.spec.json /workspace/tsconfig.spec.json
COPY angular.json /workspace/angular.json
COPY webpack.config.js /workspace/webpack.config.js
COPY webpack.prod.config.js /workspace/webpack.prod.config.js
COPY src /workspace/src

RUN ./node_modules/.bin/ng build --base-href="/app1/" --deploy-url="/app1/" --configuration production --output-path /output

FROM nginx:alpine

COPY --from=builder ./output/. /usr/share/nginx/html/app1

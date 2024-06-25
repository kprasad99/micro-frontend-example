FROM        golang:1.22-alpine3.20 AS builder
WORKDIR     /usr/src/service-discovery
COPY        go.mod /usr/src/service-discovery/go.mod
COPY        go.sum /usr/src/service-discovery/go.sum
RUN         go mod download
COPY        main.go /usr/src/service-discovery/main.go
RUN         CGO_ENABLED=0 GOOS=linux GOARCH=amd64 GO111MODULE=on go build -a

FROM        gcr.io/distroless/static:nonroot
COPY        --from=builder /usr/src/service-discovery/service-discovery /usr/local/bin/service-discovery

ENV WEB_PORT=8080

VOLUME /static
EXPOSE ${WEB_PORT}

USER 65532:65532
ENTRYPOINT  ["/usr/local/bin/service-discovery"]

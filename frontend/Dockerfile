FROM golang:1.25-bookworm AS builder
WORKDIR /build
COPY . .

RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux go build -o serverBinary .

FROM alpine:3.20.6
WORKDIR /app

COPY --from=builder /build/serverBinary /app/serverBinary

EXPOSE 8080

CMD ["/app/serverBinary"]
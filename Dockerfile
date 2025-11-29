# Builder Stage: Where the files are embedded and the binary is created.
FROM golang:1.25-bookworm AS builder

WORKDIR /build

# IMPORTANT: This copies main.go, go.mod/sum, static/, and templates/
# The folders MUST be present here for 'go build' to embed them.
COPY . .

ENV CGO_ENABLED 0
ENV GOOS linux

RUN go mod tidy

# The build command embeds the static/ and templates/ contents into serverBinary
RUN go build -o serverBinary

# Final Stage: Contains ONLY the binary and nothing else.
FROM alpine:3.20.6

WORKDIR /app
COPY --from=builder . .

# Only copy the resulting, self-contained binary.
COPY --from=builder /build/serverBinary /app/serverBinary

EXPOSE 8080

CMD ["/app/serverBinary"]
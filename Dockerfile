FROM golang:1.21-alpine AS builder

RUN apk add --no-cache build-base git

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -ldflags="-w -s" -o /app/croffle-bot ./cmd/croffle-bot

FROM alpine:latest

RUN apk add --no-cache ffmpeg yt-dlp ca-certificates

WORKDIR /app

COPY --from=builder /app/croffle-bot .

CMD ["./croffle-bot"]
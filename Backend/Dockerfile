# Stage 1: Build
FROM golang:alpine3.20 AS builder

# Set the working directory inside the container
WORKDIR /app

# Because this is a CGO enabled package, you are required to set it as 1.
ENV CGO_ENABLED=1

# Install necessary CA certificates and SQLite shared library
RUN apk --no-cache add ca-certificates sqlite-libs gcc musl-dev

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download and cache dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the Go application
RUN go build -o main 

# Second stage
FROM alpine:latest 

COPY --from=builder /app/main /main
COPY --from=builder /app/.env .env

# Ensure the binary has execute permissions
RUN chmod +x ./main

# Expose the port the app runs on
EXPOSE 8080

# Command to run the executable
CMD ["./main"]

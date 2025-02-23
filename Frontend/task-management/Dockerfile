# Stage 1: Build the React app
FROM node:18-alpine as build

# Set work directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install peer dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Run the build process
RUN npm run build

# Stage 2: Setup Nginx to serve the static files
FROM nginx:mainline-alpine3.19

# Copy the built React app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Remove default Nginx configurations
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx is listening on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
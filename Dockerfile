FROM ghcr.io/puppeteer/puppeteer:latest

USER root
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Start the server
CMD ["node", "server/server.js"]

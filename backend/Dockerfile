FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy TypeScript config and source
COPY tsconfig.json ./
COPY src ./src

# Install TypeScript for build
RUN npm install typescript

# Build
RUN npm run build

# Remove dev dependencies
RUN rm -rf node_modules && npm ci --omit=dev

EXPOSE 8080

CMD ["node", "dist/server.js"]

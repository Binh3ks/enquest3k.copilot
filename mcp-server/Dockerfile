# Dockerfile - REBUILD CHECK 2026-05-26-1 - CHANGE TO FORCE CACHE INVALIDATION
FROM node:18-alpine
ARG DEPLOY_EPOCH=2026052601
WORKDIR /app
RUN echo "Deploy epoch: $DEPLOY_EPOCH"
COPY package*.json ./
RUN npm install --omit=dev 2>&1 | tail -3
COPY . .
RUN node -e "const fs=require('fs'); const p=require('./package.json'); console.log('PKG:',p.name,'v'+p.version);"
EXPOSE 8080
CMD ["node", "index.js"]

FROM node:8.12-alpine
WORKDIR /app/server
COPY package.json /app/server
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl=false 
RUN npm install
COPY . /app/server
CMD ["npm", "run", "dev"]
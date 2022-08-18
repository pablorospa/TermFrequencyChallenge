FROM node:18-alpine3.15

# Creo carpeta de la API
RUN mkdir -p /app
WORKDIR /app

# Instalo dependencias
COPY package.json ./
COPY package-lock.json ./
RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
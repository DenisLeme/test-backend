FROM node:14

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["ts-node", "src/server.ts"]

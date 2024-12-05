FROM node:20

WORKDIR /app

COPY app/package*.json app/package-lock.json  ./

RUN npm install

COPY app .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV API_URL=http://0.0.0.0:8000

CMD ["npm", "run", "start:prod"]

# Main Container
FROM node:v14.15.4
ENV NODE_ENV=development
WORKDIR /usr/local/ps_Site
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
COPY . .
EXPOSE 5005
ENTRYPOINT ["npm run", "start:dev"]
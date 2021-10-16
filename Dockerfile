FROM node:14.15.4
ENV NODE_ENV=development
WORKDIR /usr/local/ps_Site
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
CMD [ "node", "app" ]
# ENTRYPOINT ["npm", "run start:dev"]


# Main Container
# FROM node:14.15.4
# ENV NODE_ENV=development
# WORKDIR /usr/local/ps_Site
# COPY ["package.json", "package-lock.json", "./"]
# RUN npm install --production
# COPY . .
# EXPOSE 3000
# ENTRYPOINT ["npm run", "start:dev"]
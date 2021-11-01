FROM node:16-alpine

LABEL maintainer="byaa1972@gmail.com"

RUN apk add --no-cache --upgrade bash

ENV NODE_ENV=prodcution

EXPOSE 80

RUN addgroup -S bya2 && adduser -S -G bya2
RUN mkdir /app && chown bya2 /app

WORKDIR /app

COPY --chown=bya2:bya2 package.json package-lock.json /app/

RUN npm install --production

COPY --chown=bya2:bya2 . .

CMD ["npm", "start"]
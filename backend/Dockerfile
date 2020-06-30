FROM node:lts-alpine as build-stage
COPY . .
RUN yarn install
EXPOSE 4000
CMD ["yarn", "start"]
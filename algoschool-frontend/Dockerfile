FROM node:14-slim as build-stage
WORKDIR /app
COPY ./ /app/
RUN apt-get update || : && apt-get install python make g++ -y
RUN yarn
RUN yarn build
FROM nginx:1.15
COPY ./nginx/default.conf /etc/nginx/conf.d
COPY --from=build-stage /app/build/ /usr/share/nginx/html

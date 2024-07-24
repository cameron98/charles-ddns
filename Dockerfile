FROM node:20-alpine
WORKDIR /app
RUN apk update && apk add git
RUN git clone https://github.com/cameron98/charles-ddns.git && cd charles-ddns
WORKDIR /app/charles-ddns
CMD ["node", "index.js"]
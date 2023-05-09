FROM node:14-alpine
#chuan bi moi truong nodejs , version node 14/alpine (alpine: giam dung luong node 14)

WORKDIR /duong/backend-nodejs

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli
# -g global 

COPY . .

RUN npm run build-src

CMD [ "npm", "run", "build" ]

# docker build --tag node-docker .
# docker run -p 8080:8080 -d node-docker





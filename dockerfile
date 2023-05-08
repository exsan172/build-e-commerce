FROM --platform=amd64 node:16.14.2
WORKDIR /e-commerce
COPY package*.json ./

RUN yarn install

ENV PORT=3000
ENV ALLOW_CORS=*
ENV DB_HOST=mongodb://rehatCafe:6hJx6mUXjXHMnuDS@ac-jm2r8om-shard-00-00.mxjmjvp.mongodb.net:27017,ac-jm2r8om-shard-00-01.mxjmjvp.mongodb.net:27017,ac-jm2r8om-shard-00-02.mxjmjvp.mongodb.net:27017/?ssl=true&replicaSet=atlas-12dz6m-shard-0&authSource=admin&retryWrites=true&w=majority
ENV DB_NAME=e-commerce
ENV PRIVATE_KEY=@L0nT33J4r@n
ENV CLOUD_NAME=exsan-dev
ENV FOLDER_NAME=e-commerce
ENV API_KEY=748976324489119
ENV API_SECRET=uBAic3y44QImWkbUTJwExujFhmU

COPY . .

EXPOSE 3000
CMD ["yarn", "start"]
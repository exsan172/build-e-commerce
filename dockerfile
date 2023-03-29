FROM --platform=arm64 node
WORKDIR /e-commerce
COPY package*.json ./

RUN yarn install

ENV PORT=3000
ENV ALLOW_CORS=*
ENV DB_HOST=mongodb://127.0.0.1:27017
ENV DB_NAME=e-commerce
ENV PRIVATE_KEY=@L0nT33J4r@n
ENV CLOUD_NAME=exsan-dev
ENV FOLDER_NAME=e-commerce
ENV API_KEY=748976324489119
ENV API_SECRET=uBAic3y44QImWkbUTJwExujFhmU

COPY . .
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
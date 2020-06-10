FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000


CMD ["node", "--max_old_space_size=4112", "bin/www"]
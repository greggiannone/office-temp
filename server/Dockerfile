FROM node:carbon
RUN mkdir -p /usr/src/office-temp-server
WORKDIR /usr/src/office-temp-server
COPY package.json /usr/src/office-temp-server
RUN npm install
COPY . /usr/src/office-temp-server
EXPOSE 3000
CMD ["npm", "start"]
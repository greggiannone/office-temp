FROM node:carbon
RUN mkdir -p /usr/src/office-temp
WORKDIR /usr/src/office-temp
COPY package.json /usr/src/office-temp
RUN ["npm", "install"]
COPY . /usr/src/office-temp
EXPOSE 4200/tcp
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "500"]
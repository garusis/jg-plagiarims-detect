FROM quay.io/aptible/nodejs:v8.2.x

ARG DIR_BASE=/service_dir

RUN apt-get update --fix-missing
RUN apt-get install -y curl apt-transport-https procps
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update --fix-missing && apt-get install -y yarn

COPY . ${DIR_BASE}

WORKDIR ${DIR_BASE}

RUN yarn install --prod

ENV PORT 3000
EXPOSE 3000

CMD ["npm", "start"]

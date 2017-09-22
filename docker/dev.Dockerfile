FROM quay.io/aptible/nodejs:v8.2.x


ARG USER
ARG UID
ARG GID
ARG DIR_BASE
ARG HOME=/home/jguser

RUN echo "deb http://ftp.debian.org/debian wheezy-backports main" >> /etc/apt/sources.list
RUN apt-get update --fix-missing
RUN apt-get install -y sudo git curl apt-transport-https procps jq
RUN echo "Defaults        env_reset" > /etc/sudoers
RUN echo "root        ALL=(ALL:ALL) ALL" >> /etc/sudoers
RUN echo "jguser  ALL=(ALL:ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN echo "node  ALL=(ALL:ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN useradd -ou ${UID} -p 123456 jguser
RUN mkdir -p ${HOME}/${DIR_BASE}
RUN chown jguser:jguser -R ${HOME}



USER jguser

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt-get update && sudo apt-get install -y yarn

RUN sudo ln -s ${HOME}/${DIR_BASE}/.env ${HOME}/.bashrc

WORKDIR ${HOME}/${DIR_BASE}


ENV PORT 3000

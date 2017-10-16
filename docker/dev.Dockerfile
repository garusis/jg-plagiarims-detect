FROM node:8.7

ARG USER
ARG UID
ARG GID
ARG DIR_BASE
ARG HOME=/home/node

ENV DIR_BASE $DIR_BASE

RUN echo "deb http://ftp.debian.org/debian wheezy-backports main" >> /etc/apt/sources.list
RUN apt-get update --fix-missing
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y sudo apt-transport-https procps jq
RUN echo '\
Defaults  env_reset\n\
root  ALL=(ALL:ALL) ALL\n\
jguser  ALL=(ALL:ALL) NOPASSWD: ALL\n\
node  ALL=(ALL:ALL) NOPASSWD: ALL\n\
' > /etc/sudoers
RUN mkdir -p ${HOME}/${DIR_BASE}
RUN useradd -ou ${UID} -d ${HOME} -p 123456 jguser
RUN chown jguser:jguser -R ${HOME}


USER jguser

RUN echo 'PATH=$PATH:$HOME/$DIR_BASE/scripts' >> ~/.bashrc
RUN echo 'source ~/.env' >> ~/.bashrc
RUN echo 'chmod +x -R $HOME/$DIR_BASE/scripts' >> ~/.bashrc
RUN cat ${HOME}/.bashrc
RUN sudo ln -s $HOME/$DIR_BASE/.env $HOME/.env


WORKDIR ${HOME}/${DIR_BASE}
ENV PORT 3000

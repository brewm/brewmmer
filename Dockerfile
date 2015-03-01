FROM resin/rpi-raspbian

RUN apt-get update && apt-get install -y \
    npm \
    nodejs

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
ADD . /opt/app

EXPOSE 3553 3554 3555

CMD ["nodejs", "server.js"]

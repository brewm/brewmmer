FROM resin/rpi-raspbian

RUN apt-get update && apt-get install -y \
    npm \
    nodejs

EXPOSE 3553 3554 3555

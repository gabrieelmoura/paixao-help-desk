FROM mysql:8

MAINTAINER me

ENV MYSQL_DATABASE=PHD \
    MYSQL_ROOT_PASSWORD=12345

ADD schema.sql /docker-entrypoint-initdb.d

EXPOSE 3306
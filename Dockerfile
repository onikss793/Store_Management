FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD 1
ENV MYSQL_DATABASE store_management_dev
ENV TIMEZONE UTC

EXPOSE 3306
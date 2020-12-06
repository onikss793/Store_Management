FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD 1
ENV MYSQL_DATABASE store_management_dev

COPY migrate/mysqld_charset.cnf /etc/mysql/conf.d/mysqld_charset.cnf

EXPOSE 3306

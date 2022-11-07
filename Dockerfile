FROM oraclelinux:7-slim

RUN  yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
     yum-config-manager --disable ol7_developer_EPEL && \
     yum -y install oracle-instantclient19.3-basiclite nodejs && \
     rm -rf /var/cache/yum

WORKDIR /myapp
ADD package*.json /myapp/
RUN npm install
ADD ./ /myapp/

EXPOSE 5000
CMD exec node src/index.js
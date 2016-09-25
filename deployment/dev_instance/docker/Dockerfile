FROM debian:jessie

RUN apt-get update
RUN apt-get -y install python-minimal
RUN echo "export TERM=xterm" >> /etc/bash.bashrc
EXPOSE 80
CMD ["/entrypoint.sh"]

#! /bin/bash

rm -rf SFIA3
git clone --branch JenkinsTest https://github.com/qatrainingjaguila/SFIA3.git
cd SFIA3/sfia3frontend


sudo docker build -t jonathanjhunt/sfia3-frontend:latest .
sudo docker push jonathanjhunt/sfia3-frontend:latest
#docker build -t nexus-IP:repo-port/sfia3-frontend:latest
#docker push nexus-IP:repo-port/sfia3-frontend:latest

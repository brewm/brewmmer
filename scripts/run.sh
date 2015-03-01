#!/bin/bash -e

sudo docker ps -q | xargs sudo docker kill

sudo docker run -d -p 3555:3555 brewm/brewmmer
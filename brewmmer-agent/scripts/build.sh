#!/bin/bash -e

ROOT=$(dirname $(cd $(dirname $0) && pwd))

sudo docker build --tag="brewm/brewmmer" $ROOT/

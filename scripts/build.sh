#!/bin/bash -e

ROOT=$(dirname $0)

sudo docker build --rm=true --tag="brewm/brewmmer" $ROOT/

#!/bin/bash -e

ROOT=$(dirname $0)

sudo docker build --tag="brewm/brewmmer" $ROOT/

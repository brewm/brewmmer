#!/bin/bash
#
# Ref: http://www.cl.cam.ac.uk/freshers/raspberrypi/tutorials/temperature

set -e 

modprobe w1-gpio # load gpio module
modprobe w1-therm # load temperature module

exit 0
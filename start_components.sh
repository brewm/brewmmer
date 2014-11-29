#!/bin/bash
#
# Run this script after restart

export LOG_INTERVAL=15
PROJECT_ROOT=`dirname $0`

forever start $PROJECT_ROOT/server.js
forever start $PROJECT_ROOT/src/logger.js

exit 0

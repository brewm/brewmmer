#!/bin/bash
#
# Run this script after restart

PROJECT_ROOT=`dirname $0`

forever start $PROJECT_ROOT/src/rest.js
forever start $PROJECT_ROOT/src/logger.js
#forever start $PROJECT_ROOT/src/http_server.js

exit 0

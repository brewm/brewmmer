#!/bin/bash
#
# Run this script after restart 

/opt/node/bin/forever start ./src/rest.js 
/opt/node/bin/forever start ./src/logger.js
/opt/node/bin/forever start ./src/http_server.js

exit 0
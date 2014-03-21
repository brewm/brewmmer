#!/bin/bash
#
# Run this script after restart 

forever start ./src/rest.js 
forever start ./src/logger.js
forever start ./src/http_server.js

exit 0
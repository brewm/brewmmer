#!/bin/bash
#
# Run this script after restart 

forever start ./src/rest.js 
cd src;
forever start ./logger.js
#forever start ./src/http_server.js

exit 0

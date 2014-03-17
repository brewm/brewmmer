var connect = require('connect');
connect.createServer(
    connect.static('../angular')
).listen(3552);
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));
require('./server/config/mongoose.js');     // Must be above the routes require
require('./server/config/routes.js')(app);

app.listen(8000, function() {
    console.log('Forum on: 8000');
});

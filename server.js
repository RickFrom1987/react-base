const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Define the port to run on
app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/dist'));

// Listen for requests
const server = app.listen(app.get('port'), function() {
  const port = server.address().port;
  console.log('Magic happens on port ' + port);
});
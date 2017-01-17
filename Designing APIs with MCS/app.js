var express = require('express');  
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./promotional_events')(app); 

var port = 3000;

app.listen(port, function () {
  console.log('Mock services listening on port ' +port +'!');
});
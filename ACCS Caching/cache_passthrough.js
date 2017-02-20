var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var CACHE_HOST = process.env.CACHING_INTERNAL_CACHE_URL;

var app = express();
app.set('port', (process.env.PORT || 3001));
app.use(bodyParser.raw());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Method");
  next();
});

app.all('/ccs/*', function(req, res){
  var uri = 'http://' +CACHE_HOST +':8080' + req.path;
  var options = {
    url: uri,
    method: req.method,
    headers: {}
  };
  if((req.method == 'POST' || req.method == 'PUT') && req.body){
    options["body"] = req.body;
  }
  //Handle Headers
  if(req.get('Content-Type')){
    options.headers['Content-Type'] = req.get('Content-Type');
  }
  if(req.get('Accept')){
    options.headers['Accept'] = req.get('Accept');
  }
  if(req.get('X-Method')){
    options.headers['X-Method'] = req.get('X-Method');
  }
  request(options, function(err, response, body){
    if(err){
      res.status(500).send(err);
      return;
    }
    if(!body){
      body = "";
    }
    res.set(response.headers);
    res.status(response.statusCode).send(body);
  });
});


app.get('/cache_url', function(req, res) {
  var cacheHost = process.env.CACHING_INTERNAL_CACHE_URL || "No Cache Host found!";
  res.status(200).send(cacheHost);
});


app.listen(app.get('port'), function() {
  console.log('Caching test App listening on ' + app.get('port'));
});
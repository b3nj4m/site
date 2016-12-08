// From an example of reloading / express => https://www.npmjs.com/package/reload

var express = require('express'),
  http = require('http'),
  path = require('path'),
  reload = require('reload'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  logger = require('morgan');

var app = express(),
  publicDir = path.join(__dirname, '');

app.set('title', 'site.trychameleon');
app.set('port', process.env.PORT || 3003);
app.use(logger('dev'));
app.use(bodyParser.json()); //parses json, multi-part (file), url-encoded
app.use(express.static('assets'));

app.get('/', function(req, res) {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/show', function(req, res) {
  res.sendFile(path.join(publicDir, 'show.html'));
});

if (fs.existsSync('~/.pow')) {
  require('node-pow')(app);
}

var server = http.createServer(app);

//reload code here
//optional reload delay and wait argument can be given to reload, refer to [API](https://github.com/jprichardson/reload#api) below
reload(server, app);

server.listen(app.get('port'), function() {
  console.log("Web server listening on port " + app.get('port'));
});

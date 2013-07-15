'use strict';

var express = require('express'),
    http = require('http'),
    path = require('path');


var app = express();

app.configure(function(){
        app.set('port', process.env.PORT || 8081);
        app.use(require('less-middleware')({ src: __dirname + '/app' }));
        app.use(express.static(path.join(__dirname, 'app')));
    });

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});


var livereload = require('livereload2');
var server = livereload.createServer({exts: ['less', 'jade', 'js', 'html', 'css']});
server.watch(__dirname);
'use strict';

var http = require('http');
var _= require('underscore');
var fs= require('fs');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
    host: 'www.goodreads.com',
    path: ''
};

var count= 1;
var callback = function(response) {
    var str = '';
    var quotes= [];

  //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });

  //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
        var matches= str.match(/^<div class=\"quoteText\">[^]*?<\/div>$/gim);

        _(matches).each(function(match){
            var quote= match.match(/&ldquo;([^]*?)&rdquo;/);
            quotes.push({title: quote[1]});
        });

        var json= JSON.stringify(quotes, null, 4);
        fs.writeFileSync('./data/file_'+ count+ '.json', json);
        ++count;
    });
};

_(_.range(1, 11)).each(function(num){
    var path= '/author/quotes/6172.S_ren_Kierkegaard?page=';

    options.path= path+ num;

    http.request(options, callback).end();
});




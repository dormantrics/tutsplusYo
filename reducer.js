'use strict';

var fs= require('fs');
var _= require('underscore');

var data= fs.readFileSync('./app/scripts/data/slides.json', 'utf8');

var slides= JSON.parse(data);

var slidesOut= [];

_(slides).each(function(slide){
	if(slide.title.length <= 100){
		slidesOut.push(slide);
	}
});

var jsonOut= JSON.stringify(slidesOut,  null, 4);

fs.writeFileSync('./app/scripts/data/slidesOut.json', jsonOut);
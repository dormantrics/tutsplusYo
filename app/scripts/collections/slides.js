/*global define*/
define(['backbone', 'models/slide'], function(Backbone, Slide){
	'use strict';

	var Slides= Backbone.Collection.extend({
		model: Slide
	});

	return Slides;
});
/*global define*/
define(['backbone', 'vents/vent'], function(Backbone, vent){
	'use strict';

	var Router= Backbone.Router.extend({
		routes: {
			'': 'index',
			'slides/:id': 'changeSlide'
		},

		index: function(){
			vent.trigger('slides:index');
		},

		changeSlide: function(slideIndex){
			vent.trigger('slides:change',
				{
					slideIndex: slideIndex,
					direction: ''
				}
			);
		}
	});

	return Router;
});
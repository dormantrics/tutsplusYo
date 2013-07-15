/*global define*/
define(['backbone'], function(Backbone){
	'use strict';

	var Slide= Backbone.Model.extend({
		defaults: {
			type: 'note',
			title: ''
		}
	});

	return Slide;
});
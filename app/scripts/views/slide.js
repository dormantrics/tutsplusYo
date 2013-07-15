/*global define*/
define(['backbone', 'handlebars', 'text!templates/slide.html!strip'], function(Backbone, Handlebars, slideTemplate){
	'use strict';

	var SlideView= Backbone.View.extend({
		className: 'slide',
		template: Handlebars.compile(slideTemplate),

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		}
	});

	return SlideView;
});
/*global define*/
define(['backbone'], function(Backbone){
	'use strict';

	var Slide= Backbone.Model.extend({
		defaults: {
			type: 'note',
			title: ''
		},

		initialize: function(){
			this.setSize();
		},

		setSize: function(){
			var lettersCount= this.get('title').length;
			var size;

			if(lettersCount >= 300){
				size= 'xxx-large';
			}

			else if(lettersCount >= 200){
				size= 'xx-large';
			}
			else if(lettersCount >= 100){
				size= 'x-large';
			}
			else if(lettersCount >= 50){
				size= 'large';
			}
			else {
				size= 'normal';
			}

			this.set({size: size});
		}
	});

	return Slide;
});
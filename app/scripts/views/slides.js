/*global define*/
define(['backbone', 'handlebars', 'text!templates/slides.html!strip', 'views/slide', 'vents/vent'], function(Backbone, Handlebars, slidesTemplate, SlideView, vent){
	'use strict';

	var SlidesView= Backbone.View.extend({
		className: 'slides',
		template: Handlebars.compile(slidesTemplate),

		initialize: function(){
			vent.on('slides:change', this.hndlSlideChange, this);

			$(document).on('keyup', this.hndlKeyup.bind(this));

			this.render();

			var initSlideIndex =parseInt(Backbone.history.location.href.match(/\d$/), 10);

			this.hideRest(initSlideIndex);
		},

		hndlKeyup: function(e){
			var options= {};
			if(e.keyCode=== 37 || e.keyCode=== 39){
				var direction= e.keyCode=== 39 ? 'next' : 'prev';
				options.direction= direction;

				var currentSlideIndex= this.getCurrentSlideIndex();
				var targetSlideIndex= this.getTargetSlideIndex(options, currentSlideIndex);

				var currentSlide= this.getCurrentSlide(currentSlideIndex);
				var targetSlide= this.getTargetSlide(targetSlideIndex);

				this.tansitionSlides(currentSlide, targetSlide, options);

				vent.trigger('slides:change:success', {
					slideIndex: targetSlideIndex
				});
			}
		},

		hndlSlideChange: function(options){
			var currentSlideIndex= this.getCurrentSlideIndex();
			var targetSlideIndex= this.getTargetSlideIndex(options, currentSlideIndex);

			options.direction= this.setDirection(currentSlideIndex, targetSlideIndex);

			var currentSlide= this.getCurrentSlide(currentSlideIndex);
			var targetSlide= this.getTargetSlide(targetSlideIndex);

			if(currentSlideIndex !== targetSlideIndex){
				this.tansitionSlides(currentSlide, targetSlide, options);
			}
		},

		getCurrentSlideIndex: function(){
			return this.$el.children(':visible').index()+ 1;
		},

		getTargetSlideIndex: function(options, currentSlideIndex){
			if(options.slideIndex){
				return parseInt(options.slideIndex, 10);
			}
			else {
				var slidesCount= this.$el.children().length;
				var targetSlideIndex= (options.direction=== 'next') ? currentSlideIndex+ 1 : currentSlideIndex- 1;

				if (targetSlideIndex > slidesCount){
					targetSlideIndex= 1;
				}
				else if (targetSlideIndex <= 0){
					targetSlideIndex= slidesCount;
				}

				return targetSlideIndex;
			}
		},

		getCurrentSlide: function(currentSlideIndex){
			return this.$el.children().eq(currentSlideIndex- 1);
		},

		getTargetSlide: function(targetSlideIndex){
			return this.$el.children().eq(targetSlideIndex- 1);
		},

		setDirection: function(currentSlideIndex, targetSlideIndex){
			if (currentSlideIndex < targetSlideIndex){
				return 'next';
			}
			else {
				return 'prev';
			}
		},

		tansitionSlides: function(currentSlide, targetSlide, options){
			var transitionSpeed= 1000;

			currentSlide
				// .css('position', 'absolute')
				.animate({
					top: options.direction=== 'next' ? '100%' : '-100%',
					opacity: 'hide'
				}, transitionSpeed, function(){
					$(this).css('top', 0);

					targetSlide
						// .css('position', 'absolute')
						.css('top', options.direction=== 'next' ? '-100%' : '100%')
						.animate({
							top: 0,
							opacity: 'show'
						}, transitionSpeed);
				});
		},

		hideRest: function(initSlideIndex){
			if (! initSlideIndex){
				this.$el.children(':nth-child(n+2)').hide();
			}
			else {
				this.$el.children().eq(initSlideIndex- 1).siblings().hide();
			}
		},

		render: function(){
			this.$el.html(this.template());

			this.collection.each(this.addSlide, this);

			return this;
		},

		addSlide: function(slide){
			var slideView= new SlideView({model: slide});

			this.$el.append(slideView.render().el);
		}
	});

	return SlidesView;
});
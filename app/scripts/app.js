/*global define */
define(['collections/slides', 'views/slides', 'text!data/slides.json', 'routers/router', 'backbone', 'vents/vent', 'jquery', 'cookie'], function (Slides, SlidesView, slidesData, Router, Backbone, vent, $, cookie) {
    'use strict';

    var App= function(){
        this.init= function(){
            this.chevronPosition();
            this.initSlides();
            this.initRouter();
            this.initVent();
        };

        this.chevronPosition= function(){
            $('i').css('top', $(window).height()/ 2);
        };

        this.initSlides= function(){
            this.slides= new Slides(JSON.parse(slidesData));

            this.slidesView= new SlidesView({collection: this.slides});

            $('.content').html(this.slidesView.el);
        };

        this.initRouter= function(){
            this.router= new Router();
            Backbone.history.start();

            if ($.cookie('slideIndex')){
                this.router.navigate('slides/'+ $.cookie('slideIndex'));
            }
            else {
                this.router.navigate('slides/'+ 1);
            }
        };

        this.initVent= function(){
            vent.on('slides:change:success', function(options){
                $.cookie('slideIndex', options.slideIndex);

                this.router.navigate('slides/'+ options.slideIndex);
            }, this);

            $('i').on('click', function(){
                var $this= $(this);
                var options= {};

                if($this.attr('class').match(/left$/)){
                    options.direction= 'prev';
                }
                else {
                    options.direction= 'next';
                }

                vent.trigger('slides:change', options);
            });
        };
    };

    return App;
});
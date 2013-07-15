/*global define */
define(['collections/slides', 'views/slides', 'text!data/slides.json', 'routers/router', 'backbone', 'vents/vent'], function (Slides, SlidesView, slidesData, Router, Backbone, vent) {
    'use strict';

    var App= function(){
        this.init= function(){
            this.initSlides();
            this.initRouter();
            this.initVent();
        };

        this.initSlides= function(){
            this.slides= new Slides(JSON.parse(slidesData));

            this.slidesView= new SlidesView({collection: this.slides});

            $('.content').html(this.slidesView.el);
        };

        this.initRouter= function(){
            this.router= new Router();
            Backbone.history.start();
        };

        this.initVent= function(){
            vent.on('slides:change:success', function(options){
                this.router.navigate('slides/'+ options.slideIndex);
            }, this);
        };
    };

    return App;
});
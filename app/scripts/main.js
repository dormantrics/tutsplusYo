require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        handlebars: '../bower_components/handlebars/handlebars',
        text: '../bower_components/text/text',
        bootstrap: '../bower_components/bootstrap.css/js/bootstrap',
        'jquery-cookie': '../bower_components/jquery.cookie/jquery.cookie'
    },

    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        underscore: {
            exports: '_'
        },

        handlebars: {
            exports: 'Handlebars'
        },

        bootstrap: {
            deps: ['jquery']
        },

        'jquery-cookie'  : {
            deps: ['jquery']
        }
    }
});

require(['app', 'jquery', 'jquery-cookie'], function (App, $, cookie) {
    'use strict';
    // use app here
    $.cookie();
    new App().init();
});

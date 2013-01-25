/*jshint browser:true */
/*global provide */

(function () {

  'use strict';

  var view = require('lilmvc').view;

  var todoNav = view.extend({

      init: function (bus) {
        this.el.on('click', this.navigate.bind(this, bus));
      },

      navigate: function (bus, ev) {
        this.el.removeClass('selected');
        this.$(ev.target).addClass('selected');
        bus.emit(bus.ev.TODO_NAVIGATE, ev.target.href);
        ev.preventDefault();
      }

  });

  provide('views/todonav', todoNav);

})();
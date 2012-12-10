/*jshint browser:true */
/*global provide */

(function () {

  'use strict';

  var view = require('lilmvc').view;
  var ENTER_KEY = 13;

  var todoInput = view.extend({

      init: function (bus) {
        this.el.on('keypress', this.createOrEnter.bind(this, bus));
      },

      createOrEnter: function (bus, ev) {

        if (ev.which !== ENTER_KEY || !ev.target.value) {
          return;
        }

        bus.emit(bus.ev.TODO_NEW, ev.target.value);
        ev.target.value = '';
      }

  });

  provide('views/todoinput', todoInput);

})();
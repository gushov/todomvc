/*jshint browser:true */
/*global provide */

(function () {

  'use strict';

  var model = require('lilmvc').model;

  var todo = model.extend({

    urlRoot: '/todo',

    defaults: {
      completed: false
    },

    rules: {
      title: ['required', 'string'],
      completed: ['boolean']
    },

    toggle: function () {

      this.completed = !this.completed;
      return this;
      
    }

  });

  provide('models/todo', todo);

})();

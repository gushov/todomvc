/*jshint browser:true */
/*global provide */

(function () {

  'use strict';

  var model = require('lilmvc').model;
  var Todos = require('./todos');

  var TodoList = model.extend({

    urlRoot: '/todolist',

    defaults: {
      activeCount: 0,
      completedCount: 0,
      state: 'all'
    },

    rules: {
      activeCount: ['required', 'number'],
      completedCount: ['required', 'number'],
      todos: ['object'],
      state: ['string']
    },

    children: {
      todos: Todos
    }

  });

  provide('models/todolist', TodoList);

})();

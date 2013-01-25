/*jshint browser:true */
/*global provide */

(function () {

  'use strict';

  var model = require('lilmvc').model;
  var _ = require('lil_');
  var Todos = require('models/todos');

  var TodoList = model.extend({

    urlRoot: '/todolist',

    defaults: {
      activeCount: 0,
      completedCount: 0,
      query: {}
    },

    rules: {
      activeCount: ['required', 'number'],
      completedCount: ['required', 'number'],
      todos: ['object'],
      query: ['object']
    },

    children: {
      todos: Todos
    },

    filter: function () {

      return this.todos.filter(function (todo) {
        return _.match(todo, this.query);
      }, this);
      
    }

  });

  provide('models/todolist', TodoList);

})();

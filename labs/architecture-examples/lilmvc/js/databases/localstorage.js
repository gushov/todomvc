/*jshint browser:true */
/*global provide */

(function() {

  'use strict';

  var _ = require('lil_');

  function findTodos(collection, next) {

    var todosStr = localStorage['todomvc.lilmvc.todos'];
    var todosMap = todosStr ? JSON.parse(todosStr) : {};
    var todos = [];

    _.each(todosMap, function (title, completed) {

      var todo = {
        title: title,
        completed: completed
      };

      if (_.match(todo, collection.query)) {
        todos.push(todo);
      }

    });

    next(null, todos);
    
  }

  function saveTodoList(model, next) {

    var todos = {};

    _.each(model.todos, function (todo) {
      todos[todo.title] = todo.completed;
    });

    localStorage['todomvc.lilmvc.todos'] = JSON.stringify(todos);
    next(null, model);

  }

  function handler(method, model, next) {

    var models = {
      '/todos': {
        find: findTodos
      },
      '/todolist': {
        create: saveTodoList
      }
    };

    var modelMethods = models[model.urlRoot] || {};
    var methodFunction = modelMethods[method];

    if (methodFunction) {
      methodFunction(model, next);
    }

  }

  provide('databases/localstorage', handler);

})();
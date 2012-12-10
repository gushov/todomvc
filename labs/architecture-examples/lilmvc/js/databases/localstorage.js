/*jshint browser:true */
/*global provide */

(function() {

  'use strict';

  var _ = require('lil_');

  function createTodo(model, next) {

    var todosStr = localStorage['todomvc.lilmvc.todos'];
    var todos = todosStr ? JSON.parse(todosStr) : {};

    todos[model.title] = model.completed;
    localStorage['todomvc.lilmvc.todos'] = JSON.stringify(todos);
    next(null, model);

  }

  function destroyTodo(model, next) {

    var todosStr = localStorage['todomvc.lilmvc.todos'];
    var todos = todosStr ? JSON.parse(todosStr) : {};

    delete todos[model.title];
    localStorage['todomvc.lilmvc.todos'] = JSON.stringify(todos);
    next(null, model);

  }

  function findTodos(collection, next) {

    var todosStr = localStorage['todomvc.lilmvc.todos'];
    var todosMap = todosStr ? JSON.parse(todosStr) : {};
    var todos = [];

    _.eachIn(todosMap, function (title, completed) {

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

  function handler(method, model, next) {

    var models = {
      '/todo': {
        create: createTodo,
        destroy: destroyTodo
      },
      '/todos': {
        find: findTodos
      },
    };

    var modelMethods = models[model.urlRoot] || {};
    var methodFunction = modelMethods[method];

    if (methodFunction) {
      methodFunction(model, next);
    }

  }

  provide('databases/localstorage', handler);

})();
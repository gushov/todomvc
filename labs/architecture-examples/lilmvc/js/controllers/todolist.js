/*jshint browser:true */
/*global provide */

(function () {

  'use strict';

  var controller = require('lilmvc').controller;
  var Todo = require('models/todo');
  var Todos = require('models/todos');
  // var TodoListModel = require('models/todolist');
  // var todoListModel;

  var todoList = controller.extend({

      events: [
        'TODOS_FIND',
        'TODOS_LOAD',
        'TODO_NEW',
        'TODO_DESTROY',
        'TODO_TOGGLE',
        'TODO_NAVIGATE'
      ],

      init: function (bus) {

        // todoListModel = TodoListModel.create();

        bus.on(bus.ev.TODOS_FIND, this.loadSaved.bind(this, bus));
        bus.on(bus.ev.TODO_NEW, this.addTodo.bind(this, bus));
        bus.on(bus.ev.TODO_DESTROY, this.destroyTodo.bind(this, bus));
        bus.on(bus.ev.TODO_TOGGLE, this.toggleTodo.bind(this, bus));
        bus.on(bus.ev.TODO_NAVIGATE, this.navigate.bind(this, bus));

      },

      loadSaved: function (bus, query) {

        var todos = Todos.create();

        todos.find(query, function (err, found) {
          bus.emit(bus.ev.TODOS_LOAD, found);
        });

      },

      navigate: function (bus, href) {
        this.router.get(href);
      },

      addTodo: function (bus, title) {

        var todo = Todo.create({ title: title });

        todo.save(function() {
          this.loadSaved(bus, {});
        }, this);

      },

      destroyTodo: function (bus, title) {

        var todo = Todo.create({ title: title });

        todo.destroy(function() {
          this.loadSaved(bus, {});
        }, this);

      },

      toggleTodo: function (bus, title) {

        var todos = Todos.create();

        todos.find({ title: title }, function (err, todos) {

          var todo = todos[0];
          todo.toggle().save(this.loadSaved.bind(this, bus, {}));

        }, this);

      }

  });

  provide('controllers/todolist', todoList);

})();
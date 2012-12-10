/*jshint browser:true */
/*global provide */

(function () {

  'use strict';

  var controller = require('lilmvc').controller;
  var Todo = require('models/todo');
  var Todos = require('models/todos');

  var todoList = controller.extend({

      events: [
        'TODOS_LOAD',
        'TODO_NEW',
        'TODO_DESTROY',
        'TODO_TOGGLE'
      ],

      init: function (bus) {

        bus.on(bus.ev.TODO_NEW, this.addTodo.bind(this, bus));
        bus.on(bus.ev.TODO_DESTROY, this.destroyTodo.bind(this, bus));
        bus.on(bus.ev.TODO_TOGGLE, this.toggleTodo.bind(this, bus));

        this.loadSaved(bus);

      },

      loadSaved: function (bus) {

        var todos = Todos.create();

        todos.find({}, function (err, found) {
          bus.emit(bus.ev.TODOS_LOAD, found);
        });

      },

      addTodo: function (bus, title) {

        var todo = Todo.create({ title: title });

        todo.save(function() {
          this.loadSaved(bus);
        }, this);

      },

      destroyTodo: function (bus, title) {

        var todo = Todo.create({ title: title });

        todo.destroy(function() {
          this.loadSaved(bus);
        }, this);

      },

      toggleTodo: function (bus, title) {

        var todos = Todos.create();

        todos.find({ title: title }, function (err, todos) {

          var todo = todos[0];
          todo.toggle().save(this.loadSaved.bind(this, bus));

        }, this);

      }

  });

  provide('controllers/todolist', todoList);

})();
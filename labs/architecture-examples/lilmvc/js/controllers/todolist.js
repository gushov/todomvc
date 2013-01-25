/*jshint browser:true */
/*global provide */

(function () {

  'use strict';

  var controller = require('lilmvc').controller;
  var TodoListModel = require('models/todolist');

  var todoList = controller.extend({

      todoListModel: TodoListModel.create({
        todos: []
      }),

      events: [
        'TODOS_FIND',
        'TODOS_LOAD',
        'TODO_NEW',
        'TODO_DESTROY',
        'TODO_TOGGLE',
        'TODO_NAVIGATE'
      ],

      init: function (bus) {

        bus.on(bus.ev.TODOS_FIND, this.load.bind(this, bus));
        bus.on(bus.ev.TODO_NEW, this.addTodo.bind(this, bus));
        bus.on(bus.ev.TODO_DESTROY, this.destroyTodo.bind(this, bus));
        bus.on(bus.ev.TODO_TOGGLE, this.toggleTodo.bind(this, bus));
        bus.on(bus.ev.TODO_NAVIGATE, this.navigate.bind(this, bus));

      },

      load: function (bus, query) {

        this.todoListModel.todos.find({}, function (err, found) {
          this.todoListModel.todos = found;
          this.todoListModel.query = query;
          bus.emit(bus.ev.TODOS_LOAD, this.todoListModel.filter());
        }, this);

      },

      save: function(bus) {

        this.todoListModel.save(function () {
          this.load(bus, this.todoListModel.query);
        }, this);

      },

      navigate: function (bus, href) {
        this.router.get(href);
      },

      addTodo: function (bus, title) {

        this.todoListModel.todos.add({ title: title });
        this.save(bus);

      },

      destroyTodo: function (bus, title) {

        this.todoListModel.todos.remove({ title: title });
        this.save(bus);

      },

      toggleTodo: function (bus, title) {

        var todo = this.todoListModel.todos.get({ title: title })[0];
        todo.toggle();
        this.save(bus);

      }

  });

  provide('controllers/todolist', todoList);

})();
/*jshint browser:true */
/*global provide */

(function () {

  'use strict';

  var view = require('lilmvc').view;

  var todoList = view.extend({

      init: function (bus) {

        bus.on(bus.ev.TODOS_LOAD, this.load.bind(this));
        this.el.on('click', '.destroy', this.destroy.bind(this, bus));
        this.el.on('click', '.toggle', this.toggle.bind(this, bus));

      },

      load: function (todos) {

        var todoListHtml = this.template('todo-list-template', { todos: todos });
        this.el.html(todoListHtml);
        
      },

      destroy: function (bus, ev) {

        var title = this.$(ev.target).siblings('label').text();
        bus.emit(bus.ev.TODO_DESTROY, title);

      },

      toggle: function (bus, ev) {
        
        var title = this.$(ev.target).siblings('label').text();
        bus.emit(bus.ev.TODO_TOGGLE, title);

      }

  });

  provide('views/todolist', todoList);

})();
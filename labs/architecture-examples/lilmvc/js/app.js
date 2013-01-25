/*jshint browser:true */
/*global $, Handlebars */

(function() {

	'use strict';

  var lilmvc = require('lilmvc');
  var todoListView = require('views/todolist');
  var todoInputView = require('views/todoinput');
  var todoNavView = require('views/todonav');
  var todoListCtlr = require('controllers/todolist');
  var localDb = require('databases/localstorage');

  function init(router) {

      lilmvc.syncr(localDb);
      lilmvc.dom($);

      lilmvc.template(function (id, viewObj) {

        var source = $('#' + id).html();
        var template = Handlebars.compile(source);
        return template(viewObj);

      });

      var todoList = todoListCtlr.create({
        '#todo-list': todoListView,
        '#new-todo': todoInputView,
        '#filters li a': todoNavView
      }, router);

      return {
        bus: todoList.bus
      };

  }

  function loadSaved(query, ctx) {
    ctx.bus.emit(ctx.bus.ev.TODOS_FIND, query);
  }

  lilmvc.router.create({
    init: init,
    get: {
      'lilmvc': loadSaved.bind(this, {}),
      'lilmvc/#/': loadSaved.bind(this, {}),
      'lilmvc/#/active': loadSaved.bind(this, { completed: false }),
      'lilmvc/#/completed': loadSaved.bind(this, { completed: true })
    }
  });

})();

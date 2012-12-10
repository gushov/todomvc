/*jshint browser:true */
/*global $, Handlebars */

(function() {

	'use strict';

  var lilmvc = require('lilmvc');
  var todoListView = require('views/todolist');
  var todoInputView = require('views/todoinput');
  var todoListCtlr = require('controllers/todolist');
  var localDb = require('databases/localstorage');

  lilmvc.syncr(localDb);
  lilmvc.dom($);

  lilmvc.template(function (id, viewObj) {

    var source = $('#' + id).html();
    var template = Handlebars.compile(source);
    return template(viewObj);

  });

  todoListCtlr.create({
    '#todo-list': todoListView,
    '#new-todo': todoInputView
  });

})();

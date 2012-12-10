/*jshint browser:true */
/*global provide */

(function () {

  'use strict';

  var collection = require('lilmvc').collection;
  var todo = require('models/todo');

  var todos = collection.extend({

    urlRoot: '/todos',
    model: todo
    
  });

  provide('models/todos', todos);

})();
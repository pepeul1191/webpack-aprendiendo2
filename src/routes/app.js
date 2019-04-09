import Backbone from 'backbone';
import $ from 'jquery';
import '../scss/demo.scss';

var accessRouter = Backbone.Router.extend({
  systemView: null,
  systemPermissionView: null,
  systemRoleView: null,

  permissionView: null,
  roleView: null,

  initialize: function() {
  },
  routes: {
    '': 'homeRoute',
    'system' : 'systemIndex',
    'calendar': 'calendarRoute',
    'autocomplete': 'autocompleteRoute',
    'tables': 'tableRoute',
    'upload': 'uploadRoute',
    'system/permission/:system_id' : 'systemPermission',
    'system/role/:system_id' : 'systemRole',
    '*actions' : 'default',
  },
  index: function(){
    //window.location.href = BASE_URL + "accesos/#/modulo";
  },
  default: function() {
    //window.location.href = BASE_URL + "error/access/404";
  },
  homeRoute: function(){
    alert('homeRoute');
  },
  calendarRoute: function(){
    alert('calendarRoute');
  },
  autocompleteRoute: function(){
    alert('autocompleteRoute');
  },
  tableRoute: function(){
    alert('tableRoute');
  },
  uploadRoute: function(){
    alert('uploadRoute');
  },
});

$(document).ready(function(){
  var router = new accessRouter();
  Backbone.history.start();
});

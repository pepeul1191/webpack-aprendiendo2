import Backbone from 'backbone';
import $ from 'jquery';
import HomeView from '../views/home_view';
import UploadViewTab from '../views/upload_view';
import '../scss/demo.scss';

var accessRouter = Backbone.Router.extend({
  // attributes
  homeView: null,
  calendarView: null,
  autocompleteView: null,
  tableView: null,
  uploadView: null,
  // methods
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
    if(this.homeView == null){
      this.homeView = new HomeView();
    }
    this.homeView.render();
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
    if(this.uploadView == null){
      this.uploadView = new UploadViewTab();
    }
    this.uploadView.render();
  },
});

$(document).ready(function(){
  var router = new accessRouter();
  Backbone.history.start();
});

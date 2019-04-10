import Backbone from 'backbone';
import $ from 'jquery';
import HomeTemplate from '../templates/home_template';

var HomeView = Backbone.View.extend({
	el: '#workspace',
	initialize: function(){
	},
	events: {

	},
	render: function() {
		$(this.el).html(
      HomeTemplate({
        nombre: 'Pepe',
        base_url: BASE_URL,
      }))
    ;
	},
});

export default HomeView;

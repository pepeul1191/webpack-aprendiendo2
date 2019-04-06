import Backbone from 'backbone';

var District = Backbone.Model.extend({
    initialize : function() {
        console.log(' nuevo distrito');
        this.name = 'Lima';
    }
});

export default District;

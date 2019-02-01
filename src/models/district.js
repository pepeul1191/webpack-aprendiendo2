import Backbone from 'backbone';

var District = Backbone.Model.extend({
    initialize : function() {
        this.name = 'Lima';
    }
});

export default District;
import _ from 'underscore';

var HomeTemplate = _.template(`
  <h1>hola mundo</h1>
  base_url : <%= base_url %>
  <button>
    <i class="fa fa-envelope-open" aria-hidden="true"></i> hola
  </button>
  <a href="#">
    <span class="glyphicon glyphicon-asterisk"></span>
    hola
  </a>
`);

export default HomeTemplate;

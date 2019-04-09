import _ from 'underscore';

var HomeTemplate = _.template(`
  <h1>hola mundo</h1>
  base_url : <%= base_url %>
`);

export default HomeTemplate;

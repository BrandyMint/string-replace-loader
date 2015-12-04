var utils = require('loader-utils');

module.exports = function (source) {
  this.cacheable();
  var query = utils.parseQuery(this.query);

  if (typeof query.multiple !== 'undefined') {
    for(var i = 0; i < query.multiple.length; i++){
      var option = query.multiple[i];

      source = source.replace(option.search, option.replace);
    }
  } else if (typeof query.search !== 'undefined' && typeof query.replace !== 'undefined') {
    if (typeof query.flags !== 'undefined') {
      query.search = new RegExp(query.search, query.flags);
    }

    source = source.replace(query.search, query.replace);
  }

  return source;
};

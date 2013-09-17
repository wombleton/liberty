var _ = require('underscore'),
    liberty = require('./liberty');

module.exports = function() {
    this.locales = _.toArray(arguments);

    _.extend(this, liberty);
};

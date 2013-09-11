var _ = require('underscore'),
    holidays = require('./holidays');

module.exports = function() {
    this.locales = _.toArray(arguments);

    _.extend(this, holidays);
};

var _ = require('underscore'),
    holidays = require('./holidays');

module.exports = function(locale) {
    this.locale = locale;

    _.extend(this, holidays);
};

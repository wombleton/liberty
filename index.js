var _ = require('underscore'),
    liberty = require('./liberty');

module.exports = function() {
    if (arguments.length === 1 && _.isArray(arguments[0])) {
        // use first (and only) argument as the array of locales
        this.locales = _.toArray(arguments[0]);
    } else {
        // use variable length argument list as locales array
        this.locales = _.toArray(arguments);
    }
    _.extend(this, liberty);
};

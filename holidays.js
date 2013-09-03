var _ = require('underscore'),
    RRule = require('rrule').RRule,
    moment = require('moment'),
    rules = require('./rules');

module.exports = {
    on: function(d) {
        var holidays,
            icals = rules[this.locale] || [];

        d = moment(d).startOf('day');

        holidays = _.map(icals, function(ical) {
            var rule = RRule.fromString(ical.rule);

            rule.options.dtstart = new Date(0);

            return rule.between(d.toDate(), d.clone().endOf('day').toDate(), true);
        });

        return _.flatten(holidays);
    }
};

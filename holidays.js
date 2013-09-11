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

            rule.options.dtstart = d.clone().startOf('day').toDate();

            return _.map(rule.between(d.toDate(), d.clone().endOf('day').toDate(), true), function(val) {
                return {
                    name: ical.name,
                    date: val
                };
            });
        });

        return _.without(_.flatten(holidays), []);
    }
};

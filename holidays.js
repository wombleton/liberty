var _ = require('underscore'),
    RRule = require('rrule').RRule,
    moment = require('moment'),
    rules = require('./rules');

module.exports = {
    rules: function() {
        var cals = _.map(this.locales, function(locale) {
            return rules[locale] || [];
        });

        return _.flatten(cals);
    },
    between: function(start, end) {
        var holidays,
            icals = module.exports.rules.call(this);

        start = moment(start).startOf('day');
        end = moment(end).endOf('day');

        holidays = _.map(icals, function(ical) {
            var rule = RRule.fromString(ical.rule);

            rule.options.dtstart = start.toDate();

            return _.map(rule.between(start.toDate(), end.toDate(), true), function(val) {
                return {
                    name: ical.name,
                    date: val
                };
            });
        });

        return _.without(_.flatten(holidays), []);
    },
    on: function(date) {
        return module.exports.between.call(this, date, date);
    }
};

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
    forRule: function(rrule, start, end, name) {
        var rule = RRule.fromString(rrule);

        rule.options.dtstart = start;

        return _.map(rule.between(start, end, true), function(val) {
            return {
                name: name,
                date: moment(val).startOf('day').toDate()
            };
        });
    },
    between: function(start, end) {
        var holidays,
            icals = module.exports.rules.call(this);

        start = moment(start).startOf('day');
        end = moment(end).endOf('day');

        holidays = _.map(icals, function(ical) {
            return _.map(ical.rule, function(rule) {
                return module.exports.forRule(rule, start.toDate(), end.toDate(), ical.name);
            });
        });

        return _.without(_.flatten(holidays), []);
    },
    on: function(date) {
        return module.exports.between.call(this, date, date);
    }
};

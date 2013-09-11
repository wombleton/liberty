var _ = require('underscore'),
    Holidays = require('../index');

exports['signature'] = function(test) {
    test.ok(_.isFunction(Holidays));
    test.equals(Holidays.length, 1);
    test.done();
};

exports['holidays.on finds Labour Day in .ca'] = function(test) {
    var holidays = new Holidays('ca'),
        result = holidays.on(new Date(2008, 8, 1));

    test.ok(result);
    test.equals(result.length, 1);
    test.equals(result[0].date.toDateString(), 'Mon Sep 01 2008');

    test.done();
};

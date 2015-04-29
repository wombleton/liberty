var _ = require('underscore'),
    moment = require('moment'),
    Holidays = require('../index');

exports['signature'] = function(test) {
    test.ok(_.isFunction(Holidays));
    test.equals(Holidays.length, 0);
    test.done();
};

exports['holidays.on finds Labour Day in .ca'] = function(test) {
    var holidays = new Holidays('ca'),
        result = holidays.on(new Date(2008, 8, 1));

    test.ok(result);
    test.equals(result.length, 1);
    var date = result[0].date;
    test.equals(date.toDateString(), 'Mon Sep 01 2008');
    test.equals(date.getFullYear(), 2008);
    test.equals(date.getMonth(), 8);
    test.equals(date.getDay(), 1);
    test.equals(date.getHours(), 0);
    test.equals(date.getMinutes(), 0);
    test.equals(date.getSeconds(), 0);
    test.equals(date.getMilliseconds(), 0);
    test.done();
};

exports['test between'] = function(test) {
    var holidays = new Holidays('ca'),
        result;

    result = holidays.between(moment('2008-7-1'), moment('2008-7-1'));
    test.ok(_.isArray(result));
    test.equals(result.length, 1);

    result = holidays.between(moment('2008-7-1'), moment('2008-7-31'));
    test.ok(_.isArray(result));
    test.equals(result.length, 1);

    result = holidays.between(moment('2008-7-2'), moment('2008-7-31'));
    test.ok(_.isArray(result));
    test.equals(result.length, 0);

    test.done();
};

exports['multiple locales works'] = function(test) {
    var holidays = new Holidays('ca_ab', 'ca_ns'),
        result = holidays.on(moment('2008-08-04'));

    test.equals(result.length, 2);
    test.done();
};

exports['multiple locales work with array'] = function(test) {
    var holidays = new Holidays(['ca_ab', 'ca_ns']),
        result = holidays.on(moment('2008-08-04'));

    test.equals(result.length, 2);
    test.done();
};

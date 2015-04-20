var _ = require('underscore'),
    moment = require('moment'),
    Liberty = require('..'),
    holidays;

exports['national holidays'] = function(test) {
    holidays = new Liberty('de');
    var values = _.zip([
        '2009-01-01',
        '2009-04-10',
        '2009-04-13',
        '2009-05-01',
        '2009-05-21',
        '2009-06-01',
        '2009-10-03',
        '2009-12-25',
        '2009-12-26',
    ], [
        'Neujahrstag',
        'Karfreitag',
        'Ostermontag',
        'Tag der Arbeit',
        'Christi Himmelfahrt',
        'Pfingstmontag',
        'Tag der Deutschen Einheit',
        '1. Weihnachtstag',
        '2. Weihnachtstag',
    ]);
    compareEach(values, test);
    compareNegative('2010-05-08', 'Whatever-Day', test);
    test.done();
};

exports['regional holidays'] = function(test) {
    checkRegional({
        regions: ['de_bw', 'de_by', 'de_st'],
        regionsNot: ['de_be', 'de_hb', 'de_hh', 'de_ni', 'de_sh'],
        date: '2009-01-06',
        name: 'Heilige Drei Könige',
    }, test);
    checkRegional({
        regions: ['de_bw', 'de_by', 'de_he', 'de_nw', 'de_rp', 'de_sl'],
        regionsNot: ['de_be', 'de_hb', 'de_hh', 'de_ni', 'de_sh'],
        date: '2009-06-11',
        name: 'Fronleichnam',
    }, test);
    checkRegional({
        regions: ['de_by', 'de_sl'],
        regionsNot: ['de_be', 'de_hb', 'de_hh', 'de_ni', 'de_sh'],
        date: '2009-08-15',
        name: 'Mariä Himmelfahrt',
    }, test);
    checkRegional({
        regions: ['de_bb', 'de_mv', 'de_sn', 'de_st', 'de_th'],
        regionsNot: ['de_be', 'de_hb', 'de_hh', 'de_ni', 'de_sh'],
        date: '2009-10-31',
        name: 'Reformationstag',
    }, test);
    checkRegional({
        regions: ['de_bw', 'de_by', 'de_nw', 'de_rp', 'de_sl'],
        regionsNot: ['de_be', 'de_hb', 'de_hh', 'de_ni', 'de_sh'],
        date: '2009-11-01',
        name: 'Allerheiligen',
    }, test);
    test.done();
};

exports['repentance day in saxony'] = function(test) {
    // repentance day (Buß- und Bettag) gets its own test because it has a quite
    // peculiar recurrence rule, it is the last Wednesday before
    // November 23.
    holidays = new Liberty('de_sn');
    var values = _.zip([
        '2004-11-17',
        '2005-11-16',
        '2006-11-22',
        '2007-11-21',
        '2008-11-19',
        '2009-11-18',
        '2010-11-17',
        '2011-11-16',
        '2012-11-21',
        '2013-11-20',
        '2014-11-19',
        '2015-11-18',
        '2016-11-16',
        '2017-11-22',
        '2018-11-21',
        '2019-11-20',
        '2020-11-18',
        '2021-11-17',
        '2022-11-16',
        '2023-11-22',
        '2024-11-20',
    ], fillArray(21, 'Buß- und Bettag'));
    compareEach(values, test);
    test.done();
};

function compareEach(pairs, test) {
    _.each(pairs, function(pair) {
        comparePositive(pair[0], pair[1], test);
    });
}

function comparePositive(date, name, test) {
    var date = moment(date);
    var holidayDate = holidays.on(date)[0];
    test.ok(!!holidayDate, 'There should be a public holiday (' + name +
        ') on ' + date.format() + ' in region \'' + holidays.locales + '\'.');
    if (holidayDate) {
        test.equals(holidayDate.name, name);
    }
}

function compareNegative(date, name, test) {
    date = moment(date);
    var holidayDate = holidays.on(date)[0];
    test.ok(!holidayDate, name + ' (' + date.format() + ') is not a ' +
            'public holiday in region \'' + holidays.locales + '\'.');
}

function checkRegional(config, test) {
    config.regions.forEach(function(region) {
        holidays = new Liberty(region);
        comparePositive(config.date, config.name, test);
    });
    config.regionsNot.forEach(function(region) {
        holidays = new Liberty(region);
        compareNegative(config.date, config.name, test);
    });
}

function fillArray(n, value) {
    return Array.apply(null, new Array(n)).map(function() { return value; });
}

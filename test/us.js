'use strict';

var _ = require('underscore'),
    holidays = new (require('../index'))('us');

exports['national holidays'] = function(test) {
    var values = _.zip([
        new Date(2008,0,1),
        new Date(2008,0,21),
        new Date(2008,1,18),
        new Date(2008,4,26),
        new Date(2008,6,4),
        new Date(2008,8,1),
        new Date(2008,9,13),
        new Date(2008,10,11),
        new Date(2008,10,27),
        new Date(2008,11,25)
    ], [
        'New Year\'s Day',
        'Martin Luther King, Jr. Day',
        'President\'s Day',
        'Memorial Day',
        'Independence Day',
        'Labour Day',
        'Columbus Day',
        'Veterans Day',
        'Thanksgiving',
        'Christmas Day'
    ]);
    _.each(values, function(pair) {
        test.equals(holidays.on(pair[0])[0].name, pair[1]);
    });

    test.done();
  };

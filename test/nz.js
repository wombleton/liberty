var _ = require('underscore'),
    moment = require('moment'),
    holidays;

function compare(pairs, test) {
    _.each(pairs, function(pair) {
        test.equals(holidays.on(moment(pair[0]))[0].name, pair[1]);
    });
}

exports['national holidays'] = function(test) {
    holidays = new (require('../index'))('nz');
    var values = _.zip([
        '2007-1-1',
        '2007-1-2',
        '2007-2-6',
        '2007-4-6',
        '2007-4-9',
        '2007-4-25',
        '2007-12-25',
        '2007-12-26',
    ], [
        'New Year\'s Day',
        'Day after New Year\'s Day',
        'Waitangi Day',
        'Good Friday',
        'Easter Monday',
        'Anzac Day',
        'Christmas Day',
        'Boxing Day'
    ]);

    compare(values, test);

    test.done();
}

exports['regional holidays'] = function(test) {
    holidays = new (require('../index'))('nz_ca', 'nz_ch');
    var values = _.zip([
                       '2014-11-14',
                       '2015-11-13',
                       '2016-11-11',
                       '2014-12-1',
                       '2015-11-30',
                       '2016-11-28'
    ], [
                       'Canterbury Anniversary Day',
                       'Canterbury Anniversary Day',
                       'Canterbury Anniversary Day',
                       'Chatham Island Anniversary Day',
                       'Chatham Island Anniversary Day',
                       'Chatham Island Anniversary Day'
    ]);

    compare(values, test);

    test.done();
}

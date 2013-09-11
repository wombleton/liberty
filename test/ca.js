var _ = require('underscore'),
    holidays = new (require('../index'))('ca');

exports['assertions'] = function(test) {
    var values = _.zip([
        new Date(2008,0,1),
        new Date(2008,2,21),
        new Date(2008,2,24),
        new Date(2008,4,19),
        new Date(2008,6,1),
        new Date(2008,8,1),
        new Date(2008,9,13),
        new Date(2008,10,11),
        new Date(2008,11,25),
        new Date(2008,11,26)
    ], [
        'New Year\'s Day',
        'Good Friday',
        'Easter Monday',
        'Victoria Day',
        'Canada Day',
        'Labour Day',
        'Thanksgiving',
        'Remembrance Day',
        'Christmas Day',
        'Boxing Day'
    ]);
    _.each(values, function(pair) {
        debugger;
        test.equals(holidays.on(pair[0])[0].name, pair[1]);
    });

    test.done();
}

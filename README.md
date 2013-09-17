liberty
=======

Adapted from Alex Dunae's `holidays` gem. Calculate the statutory holidays on a given day or in a date range.

Holidays are defined by iCalendar recurrence rules.

Usage
=====

    var Liberty = require('liberty'),
        holidays = new Liberty('ca');

    holidays.on(new Date(2008, 9, 1)); // returns [ { name: 'Labour Day', region: 'ca', date: Date } ]

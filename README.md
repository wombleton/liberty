liberty
=======

Adapted from Alex Dunae's `holidays` gem. Calculate the statutory holidays on a given day or in a date range.

Holidays are defined by iCalendar recurrence rules.

Implemented rules:

* Canada
* New Zealand
* US
 
Usage
=====

    var Liberty = require('liberty'),
        holidays = new Liberty('ca');

    holidays.on(new Date(2008, 8, 1)); // returns [ { name: 'Labour Day', date: Date } ]
    holidays.between('2008-10-1', '2008-11-30') // returns Thanksgiving & Remembrance Day

Accepts anything `moment` will accept.

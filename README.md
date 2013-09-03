node-holidays
=============

Usage
=====

    var Holidays = require('node-holidays'),
        holidays = new Holidays('ca');

    holidays.on(new Date(2008, 9, 1)); // returns [ { name: 'Labour Day', region: 'ca', date: Date } ]

liberty
=======

Usage
=====

    var Liberty = require('liberty'),
        holidays = new Liberty('ca');

    holidays.on(new Date(2008, 9, 1)); // returns [ { name: 'Labour Day', region: 'ca', date: Date } ]

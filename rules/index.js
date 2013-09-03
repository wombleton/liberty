var _ = require('underscore'),
    files,
    fs = require('fs'),
    re = /\.yaml$/;

require('js-yaml');

files = fs.readdirSync('./data');

module.exports = {};

_.each(files, function(file) {
    if (re.test(file)) {
        module.exports[file.replace(re, '')] = require('../data/' + file);
    }
});

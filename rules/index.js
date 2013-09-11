var _ = require('underscore'),
    files,
    fs = require('fs'),
    re = /\.yaml$/;

require('js-yaml');

files = fs.readdirSync('./data');

module.exports = {};

_.each(files, function(file) {
    var definitions;

    if (re.test(file)) {
        definitions = require('../data/' + file);

        _.each(definitions, function(definition) {
            _.each(definition.regions, function(locale) {
                module.exports[locale] = module.exports[locale] || [];

                module.exports[locale].push(definition);
            });
        });
    }
});

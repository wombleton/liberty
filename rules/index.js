var _ = require('underscore'),
    files,
    fs = require('fs'),
    re = /\.yaml$/;

require('js-yaml');

files = fs.readdirSync(__dirname + '/../data');

module.exports = {};

_.each(files, function(file) {
    var definitions;

    if (re.test(file)) {
        definitions = require(__dirname + '/../data/' + file);

        _.each(definitions, function(definition) {
            _.each(definition.regions, function(locale) {
                module.exports[locale] = module.exports[locale] || [];

                if (!_.isArray(definition.rule)) {
                    definition.rule = [definition.rule];
                }

                module.exports[locale].push(definition);
            });
        });
    }
});

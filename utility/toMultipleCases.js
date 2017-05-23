const s = require('underscore.string');

module.exports = (name)=>({
    camel: s.camelcase(name),
    upper: s.underscored(name).toUpperCase(),
    capitalized: s.capitalize(name)
});
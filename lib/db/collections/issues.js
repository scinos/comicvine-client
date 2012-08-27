var backbone = require('backbone'),
    Issue = require('./../models/issue.js'),
    Collection = require("./../collection.js");

var Issues = Collection.extend({
    model: Issue,
    baseUrl: "/issues/"
});

module.exports = Issues;

var backbone = require('backbone'),
    Origin = require('./../models/origin.js'),
    Collection = require("./../collection.js");

var Origins = Collection.extend({
    model: Origin,
    baseUrl: "/origins/"
});

module.exports = Origins;

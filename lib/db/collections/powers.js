var backbone = require('backbone'),
    Power = require('./../models/power.js'),
    Collection = require("./../collection.js");

var Powers = Collection.extend({
    model: Power,
    baseUrl: "/powers/"
});

module.exports = Powers;

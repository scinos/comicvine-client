var backbone = require('backbone'),
    Location = require('./../models/location.js'),
    Collection = require("./../collection.js");

var Locations = Collection.extend({
    model: Location,
    baseUrl: "/locations/"
});

module.exports = Locations;

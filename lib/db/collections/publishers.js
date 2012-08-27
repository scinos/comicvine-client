var backbone = require('backbone'),
    Publisher = require('./../models/publisher.js'),
    Collection = require("./../collection.js");

var Publishers = Collection.extend({
    model: Publisher,
    baseUrl: "/publishers/"
});

module.exports = Publishers;

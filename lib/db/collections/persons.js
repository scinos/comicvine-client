var backbone = require('backbone'),
    Person = require('./../models/person.js'),
    Collection = require("./../collection.js");

var Persons = Collection.extend({
    model: Person,
    baseUrl: "/persons/"
});

module.exports = Persons;

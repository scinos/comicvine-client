var backbone = require('backbone'),
    Concept = require('./../models/concept.js'),
    Collection = require("./../collection.js");

var Concepts = Collection.extend({
    model: Concept,
    baseUrl: "/concepts/"
});

module.exports = Concepts;

var backbone = require('backbone'),
    Character = require('./../models/character.js'),
    Collection = require("./../collection.js");

var Characters = Collection.extend({
    model: Character,
    baseUrl: "/characters/"
});

module.exports = Characters;

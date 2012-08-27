var backbone = require('backbone'),
    Team = require('./../models/team.js'),
    Collection = require("./../collection.js");

var Teams = Collection.extend({
    model: Team,
    baseUrl: "/teams/"
});

module.exports = Teams;

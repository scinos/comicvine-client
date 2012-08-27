var backbone = require('backbone'),
    Movie = require('./../models/movie.js'),
    Collection = require("./../collection.js");

var Movies = Collection.extend({
    model: Movie,
    baseUrl: "/movies/"
});

module.exports = Movies;

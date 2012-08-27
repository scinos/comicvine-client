var backbone = require('backbone'),
    Objct = require('./../models/objct.js'),
    Collection = require("./../collection.js");

var Objcts = Collection.extend({
    model: Objct,
    baseUrl: "/objects/"
});

module.exports = Objcts;

var backbone = require('backbone'),
    Volume = require('./../models/volume.js'),
    Collection = require("./../collection.js");

var Volumes = Collection.extend({
    model: Volume,
    baseUrl: "/volumes/"
});

module.exports = Volumes;

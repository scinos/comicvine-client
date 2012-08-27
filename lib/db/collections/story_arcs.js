var backbone = require('backbone'),
    StoryArc = require('./../models/story_arc.js'),
    Collection = require("./../collection.js");

var StoryArcs = Collection.extend({
    model: StoryArc,
    baseUrl: "/story_arcs/"
});

module.exports = StoryArcs;

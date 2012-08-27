var Model = require('./../model.js'),
    Collection = require('./../collection.js');

var StoryArc = Model.extend({
    baseUrl: "http://api.comicvine.com/story_arc/",
    idAttribute: "id",
    modelName: 'StoryArc',

    parse: function(response) {
        var collections = require('./../index.js').collections;
        var modelData = response.results?response.results:response;

        Model.transformData(modelData, {
            //aliases - List of aliases that the story arc is known by. A \n (newline) separates each alias.
            "aliases": function(data) { return data.split("\n") },

            //date_added - Date th  story arc was added to Comic Vine
            "date_added": function(data) { return new Date(data) },

            //date_last_updated - Date the story arc was last updated on Comic Vine
            "date_last_updated": function(data) { return new Date(data) },

            //first_appeared_in_issue - Issue this  story arc first appears in.
            "first_appeared_in_issue": collections.Issues,

            //issues - List of issues that appear in this story arc.
            "issues": collections.Issues,

            //movies - List of movies that appear in this story arc.
            "movies": collections.Movies,

            //publisher - Primary publisher of this story arc.
            "publisher": collections.Publishers
        });

        //
        //Other fields saved without transformation:
        //
        //  api_detail_url                  URL pointing to the story_arc detail resource
        //  count_of_issue_appearances      The number of issues included in this story arc.
        //  deck                            Brief summary of the story_arc
        //  description                     Description of the story_arc
        //  id                              Unique ID of the story_arc
        //  image                           Main Image of the story_arc
        //  name                            Name of the story_arc
        //  site_detail_url                 URL pointing to the story_arc on Comic Vine

        return modelData;
    }

});

module.exports = StoryArc;
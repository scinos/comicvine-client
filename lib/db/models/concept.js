var Model = require('./../model.js'),
    Collection = require('./../collection.js');

var Concept = Model.extend({
    baseUrl: "http://api.comicvine.com/concept/",
    idAttribute: "id",
    modelName: 'Concept',

    parse: function(response) {
        var collections = require('./../index.js').collections;
        var modelData = response.results?response.results:response;

        Model.transformData(modelData, {
            //aliases - List of aliases that the concept is known by. A \n (newline) separates each alias.
            "aliases": function(data) { return data.split("\n") },

            //date_added - Date the concept was added to Comic Vine
            "date_added": function(data) { return new Date(data) },

            //date_last_updated - Date the concept was last updated on Comic Vine
            "date_last_updated": function(data) { return new Date(data) },

            //first_appeared_in_issue - The issue this concept first appeared in.
            "first_appeared_in_issue": collections.Issues,

            //issue_credits - List of issues this concept appears in.
            "issue_credits": collections.Issues,

            //movies - List of movies this concept appears in.
            "movies": collections.Movies,

            //volume_credits - List of comic volumes this concept appears in.
            "volume_credits": collections.Volumes
        });

        //
        //Other fields saved without transformation:
        //
        //api_detail_url               URL pointing to the concept detail resource
        //count_of_issue_appearances   The number of issues this concept appears in.
        //deck                         Brief summary of the concept
        //description                  Description of the concept
        //id                           Unique ID of the concept
        //image                        Main Image of the concept
        //name                         Name of the concept
        //site_detail_url              URL pointing to the concept on Comic Vine
        //start_year                   The first year this concept appeared in comics.

        return modelData;
    }
});

module.exports = Concept;
var Model = require('./../model.js'),
    Collection = require('./../collection.js');

var Location = Model.extend({
    baseUrl: "http://api.comicvine.com/location/",
    idAttribute: "id",
    modelName: 'Location',

    parse: function(response) {
        var collections = require('./../index.js').collections;
        var modelData = response.results?response.results:response;

        Model.transformData(modelData, {
            //aliases - List of aliases that the location  is known by. A \n (newline) separates each alias.
            "aliases": function(data) { return data.split("\n") },

            //date_added - Date the location was added to Comic Vine
            "date_added": function(data) { return new Date(data) },

            //date_last_updated - Date the location was last updated on Comic Vine
            "date_last_updated": function(data) { return new Date(data) },

            //first_appeared_in_issue - Issue this location first appears in.
            "first_appeared_in_issue": collections.Issues,

            //issue_credits - List of issues this location appears in.
            "issue_credits": collections.Issues,

            //movies - List of movies this location appears in.
            "movies": collections.Movies,

            //story_arc_credits - List of story arcs this location appears in.
            "story_arc_credits": collections.StoryArcs,

            //volume_credits - List of comic volumes this location appears in.
            "volume_credits": collections.Volumes
        });

        //
        //Other fields saved without transformation:
        //
        //  api_detail_url                  URL pointing to the location  detail resource
        //  count_of_issue_appearances      Number of issues this location  appears in.
        //  deck                            Brief summary of the location
        //  description                     Description of the location
        //  id                              Unique ID of the location
        //  image                           Main Image of the location
        //  name                            Name of the location
        //  site_detail_url                 URL pointing to the location  on Comic Vine
        //  start_year                      The first year this location appeared in comics.

        return modelData;
    }
});

module.exports = Location;
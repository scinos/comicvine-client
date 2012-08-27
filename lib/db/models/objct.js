var Model = require('./../model.js'),
    Collection = require('./../collection.js');

var Objct = Model.extend({
    baseUrl: "http://api.comicvine.com/object/",
    idAttribute: "id",
    modelName: 'Objct',

    parse: function(response) {
        var collections = require('./../index.js').collections;
        var modelData = response.results?response.results:response;

        Model.transformData(modelData, {
            //aliases - List of aliases that the object is known by. A \n (newline) separates each alias.
            "aliases": function(data) { return data.split("\n") },

            //date_added - Date the thing  was added to Comic Vine
            "date_added": function(data) { return new Date(data) },

            //date_last_updated - Date the thing  was last updated on Comic Vine
            "date_last_updated": function(data) { return new Date(data) },

            //issue_credits - List of issues this object appears in.
            "issue_credits": collections.Issues,

            //movies - List of movies this character appears in.
            "movies": collections.Movies,

            //story_arc_credits - List of story arcs this object appears in.
            "story_arc_credits": collections.StoryArcs,

            //volume_credits - List of comic volumes this object appears in.
            "volume_credits": collections.Volumes
        });

        //
        //Other fields saved without transformation:
        //
        //  api_detail_url                  URL pointing to the thing  detail resource
        //  count_of_issue_appearances      Number of issues this object appears in.
        //  deck                            Brief summary of the thing
        //  description                     Description of the thing
        //  id                              Unique ID of the thing
        //  image                           Main Image of the thing
        //  name                            Name of the thing
        //  site_detail_url                 URL pointing to the thing on Comic Vine
        //  start_year                      The first year this object appeared in comics.

        return modelData;
    }
});

module.exports = Objct;
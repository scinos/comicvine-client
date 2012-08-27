var Model = require('./../model.js'),
    Collection = require('./../collection.js');

var Movie = Model.extend({
    baseUrl: "http://api.comicvine.com/movie/",
    idAttribute: "id",
    modelName: 'Movie',

    parse: function(response) {
        var collections = require('./../index.js').collections;
        var modelData = response.results?response.results:response;

        Model.transformData(modelData, {
            //aliases - List of aliases that the team is known by. A \n (newline) separates each alias.
            "aliases": function(data) { return data.split("\n") },

            //characters - List of characters that appear in this movie
            "characters": collections.Characters,

            //concepts - List of concepts that appear in this movie
            "concepts": collections.Concepts,

            //date_added - Date the movie was added to Comic Vine
            "date_added": function(data) { return new Date(data) },

            //date_last_updated - Date the movie was last updated on Comic Vine
            "date_last_updated": function(data) { return new Date(data) },

            //locations - List of locations that appear in this movie
            "locations": collections.Locations,

            //producers - List of producers that the produced the movie. A \n (newline) separates each producer.
            "producers": function(data) { return data.split("\n") },

            //release_date - Date the movie was released
            "release_date": function(data) { return new Date(data) },

            //story_arc_credits - List of story arcs that appears in this movie.
            "story_arc_credits": collections.StoryArcs,

            //studios - List of studios that the produced the movie. A \n (newline) separates each studio.
            "studios": function(data) { return data.split("\n") },

            //teams - List of teams that appear in this movie
            "teams": collections.Teams,

            //things - List of objects that appear in this movie
            "things": collections.Objcts,

            //writers - List of writers that the wrote the movie. A \n (newline) separates each producer.
            "writers": function(data) { return data.split("\n") }
        });

        //
        //Other fields saved without transformation:
        //
        //  api_detail_url                  URL pointing to the team detail resource
        //  box_office_revenue
        //  budget
        //  deck                            Brief summary of the movie
        //  description                     Description of the movie
        //  director
        //  distributor
        //  has_staff_review
        //  id                              Unique ID of the movie
        //  image                           Main Image of the movie
        //  name                            Name of the team
        //  rating
        //  runtime
        //  site_detail_url                 URL pointing to the team on Comic Vine
        //  total_revenue

        return modelData;
    }
});

module.exports = Movie;
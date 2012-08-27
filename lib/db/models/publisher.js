var Model = require('./../model.js'),
    Collection = require('./../collection.js');

var Publisher = Model.extend({
    baseUrl: "http://api.comicvine.com/publisher/",
    idAttribute: "id",
    modelName: 'Person',

    parse: function(response) {
        var collections = require('./../index.js').collections;
        var modelData = response.results?response.results:response;

        Model.transformData(modelData, {
            //aliases - List of aliases that the publisher  is known by. A \n (newline) separates each alias.
            "aliases": function(data) { return data.split("\n") },

            //characters - List of characters attached primarily to this publisher
            "characters": collections.Characters,

            //date_added - Date the publisher added to Comic Vine
            "date_added": function(data) { return new Date(data) },

            //date_last_updated - Date the publisher was last updated on Comic Vine
            "date_last_updated": function(data) { return new Date(data) },

            //story_arcs - List of story arcs tied to this publisher.
            "story_arcs": collections.StoryArcs,

            //teams - List of teams tied primarily to this publisher.
            "teams": collections.Teams,

            //volumes - List of volumes this publisher has put out.
            "volumes": collections.Volumes
        });

        //
        //Other fields saved without transformation:
        //
        //  api_detail_url                  URL pointing to the publisher  detail resource
        //  deck                            Brief summary of the character
        //  description                     Description of the character
        //  id                              Unique ID of the character
        //  image                           Main Image of the character
        //  location_address                The physical address of the publisher.
        //  location_city                   The city this publisher is located in.
        //  location_state                  The state this publisher is located in.
        //  name                            Name of the character
        //  site_detail_url                 URL pointing to the character on Comic Vine

        return modelData;
    }

});

module.exports = Publisher;
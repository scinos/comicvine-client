var Model = require('./../model.js'),
    Collection = require('./../collection.js');

var Volume = Model.extend({
    baseUrl: "http://api.comicvine.com/volume/",
    idAttribute: "id",
    modelName: 'Volume',

    parse: function(response) {
        var collections = require('./../index.js').collections;
        var modelData = response.results?response.results:response;

        Model.transformData(modelData, {
            //aliases - List of aliases that the volume is known by. A \n (newline) separates each alias.
            "aliases": function(data) { return data.split("\n") },

            //character_credits - List of characters that appear in this volume.
            "character_credits": collections.Characters,

            //concept_credits - List of concepts that appear in this volume.
            "concept_credits": collections.Concepts,

            //date_added - Date the volume was added to Comic Vine
            "date_added": function(data) { return new Date(data) },

            //date_last_updated - Date the volume was last updated on Comic Vine
            "date_last_updated": function(data) { return new Date(data) },

            //first_issue - The first issue in this volume.
            "first_issue": collections.Issues,

            //issues - List of issues included in this volume.
            "issues": collections.Issues,

            //last_issue - The last issue in this volume.
            "last_issue": collections.Issues,

            //location_credits - List of locations included in this volume.
            "location_credits": collections.Locations,

            //object_credits - List of people (writers, artists) included in this volume.
            "object_credits": collections.Objcts,

            //person_credits - List of people (writers, artists) included in this volume.
            "person_credits": collections.Persons,

            //publisher - Primary publisher of this volume.
            "publisher": collections.Publishers,

            //team_credits - List of teams included in this volume.
            "team_credits": collections.Teams
        });

        //
        //Other fields saved without transformation:
        //
        //  api_detail_url                  URL pointing to the volume detail resource
        //  count_of_issues                 Number of issues included in this volume.
        //  deck                            Brief summary of the volume
        //  description                     Description of the volume
        //  id                              Unique ID of the volume
        //  image                           Main Image of the volume
        //  name                            Name of the volume
        //  site_detail_url                 URL pointing to the volume on Comic Vine
        //  start_year                      The year this volume first appeared on shelves.

        return modelData;
    }
});

module.exports = Volume;
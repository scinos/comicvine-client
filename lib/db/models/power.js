var Model = require('./../model.js'),
    Collection = require('./../collection.js');

var Power = Model.extend({
    baseUrl: "http://api.comicvine.com/power/",
    idAttribute: "id",

    parse: function(response) {
        var collections = require('./../index.js').collections;
        var modelData = response.results?response.results:response;

        Model.transformData(modelData, {
            //aliases - List of aliases that the story arc is known by. A \n (newline) separates each alias.
            "aliases": function(data) { return data.split("\n") },

            //characters - List of characters with this power.
            "characters": collections.Characters,

            //date_added - Date th  story arc was added to Comic Vine
            "date_added": function(data) { return new Date(data) },

            //date_last_updated - Date the story arc was last updated on Comic Vine
            "date_last_updated": function(data) { return new Date(data) }
        });

        //
        //Other fields saved without transformation:
        //
        //  api_detail_url                  URL pointing to the power detail resource
        //  description                     Description of the power
        //  id                              Unique ID of the power
        //  name                            Name of the power
        //  site_detail_url                 URL pointing to the power on Comic Vine

        return modelData;
    }

});

module.exports = Power;
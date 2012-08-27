var Model = require('./../model.js'),
    Collection = require('./../collection.js');

var Origin = Model.extend({
    baseUrl: "http://api.comicvine.com/origin/",
    idAttribute: "id",
    modelName: 'Origin',

    parse: function(response) {
        var collections = require('./../index.js').collections;
        var modelData = response.results?response.results:response;

        Model.transformData(modelData, {
            //character_set
            "character_set": collections.Characters
        });

        //
        //Other fields saved without transformation:
        //
        //  api_detail_url                  URL pointing to the person detail resource
        //  id                              Unique ID of the character
        //  name                            Name of the character
        //  site_detail_url                 URL pointing to the character on Comic Vine
        //  profile                         Unknow :(

        return modelData;
    }

});

module.exports = Origin;
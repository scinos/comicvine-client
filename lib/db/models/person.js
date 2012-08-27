var Model = require('./../model.js'),
    Collection = require('./../collection.js');

var Person = Model.extend({
    baseUrl: "http://api.comicvine.com/person/",
    idAttribute: "id",
    modelName: 'Person',

    parse: function(response) {
        var collections = require('./../index.js').collections;
        var modelData = response.results?response.results:response;

        Model.transformData(modelData, {
            //aliases - List of aliases that the person is known by. A \n (newline) separates each alias.
            "aliases": function(data) { return data.split("\n") },

            //birth - Date of birth.
            "birth": function(data) { return new Date(data) },

            //created_characters - Comic characters this person created.
            "created_characters": collections.Characters,

            //created_teams - Teams this person created.
            "created_teams": collections.Teams,

            //date_added - Date the person added to Comic Vine
            "date_added": function(data) { return new Date(data) },

            //date_last_updated - Date the person was last updated on Comic Vine
            "date_last_updated": function(data) { return new Date(data) },

            //death - Date this person died on.
            "death": function(data) { return new Date(data) },

            //issue_credits - List of issues this person is credited in.
            "issue_credits": collections.Issues,

            //story_arc_credits - ist of story arcs this person is credited in..
            "story_arc_credits": collections.StoryArcs,

            //volume_credits - List of volumes this person is credited in.
            "volume_credits": collections.Volumes
        });

        //
        //Other fields saved without transformation:
        //
        //  api_detail_url                  URL pointing to the person detail resource
        //  count_of_issue_appearances      Number of issues this person appears in
        //  country                         Country of residence for this person.
        //  deck                            Brief summary of the character
        //  description                     Description of the character
        //  email                           Email address of this person.
        //  gender                          Male or Female.
        //  hometown                        The town this person grew up in.
        //  id                              Unique ID of the character
        //  image                           Main Image of the character
        //  name                            Name of the character
        //  site_detail_url                 URL pointing to the character on Comic Vine
        //  website                         URL pointing to the personal website of this person.

        return modelData;
    }

});

module.exports = Person;
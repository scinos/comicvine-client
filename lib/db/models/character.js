var Model = require('./../model.js'),
    Collection = require('./../collection.js');

var Character = Model.extend({
    baseUrl: "http://api.comicvine.com/character/",
    idAttribute: "id",
    modelName: 'Character',
    parse: function(response) {
        var collections = require('./../index.js').collections;
        var modelData = response.results?response.results:response;

        Model.transformData(modelData, {
            //character_enemies - List of characters that are enemies with this character.
            "character_enemies": collections.Characters,

            //character_friends - List of characters that are friends with this character.
            "character_friends": collections.Characters,

            //publisher - The primary publisher a character is attached to.
            "publisher": collections.Publishers,

            //creators - List of the real life people who created this character.
            "creators": collections.Persons,

            //teams - List of teams this character is a member of.
            "teams": collections.Teams,

            //team_enemies - List of teams that are enemies of this character.
            "team_enemies": collections.Teams,

            //team_friends - List of teams that are friends with this character.
            "team_friends": collections.Teams,

            //first_appeared_in_issue - The issue this character first appeared in.
            "first_appeared_in_issue": collections.Issues,

            //issue_credits - List of issues this character appears in.
            "issue_credits": collections.Issues,

            //issues_died_in - List of issues this character died in.
            "issues_died_in": collections.Issues,

            //movies - List of movies this character appears in.
            "movies": collections.Movies,

            //origin - The origin of the character. Human, Alien, Robot ...etc
            "origin": collections.Origins,

            //powers - List of super powers a character has.
            "powers": collections.Powers,

            //story_arc_credits - List of story arcs this character appears in.
            "story_arc_credits": collections.StoryArcs,

            //volume_credits - List of comic volumes this character appears in.
            "volume_credits": collections.Volumes,

            //aliases - List of aliases that the character is known by. A \n (newline) separates each alias.
            "aliases": function(data) { return data.split("\n") },

            //birth - A date, if one exists, that the character was born on. Not an origin date.
            "birth": function(data) { return new Date(data) },

            //date_added - Date the character was added to Comic Vine
            "date_added": function(data) { return new Date(data) },

            //date_last_updated - Date the character was last updated on Comic Vine
            "date_last_updated": function(data) { return new Date(data) }
        });

        //
        //Other fields saved without transformation:
        //
        //  api_detail_url                  URL pointing to the character detail resource
        //  count_of_issue_appearances      Number of issues this character appears in
        //  deck                            Brief summary of the character
        //  description                     Description of the character
        //  gender                          Male, female or other.
        //  id                              Unique ID of the character
        //  image                           Main Image of the character
        //  last_name                       The real last name of the character (Kent for Superman).
        //  name                            Name of the character
        //  real_name                       The first name of a character (Clark for Superman).
        //  site_detail_url                 URL pointing to the character on Comic Vine

        return modelData;
    }
});

module.exports = Character;

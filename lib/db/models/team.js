var Model = require('./../model.js'),
    Collection = require('./../collection.js');

var Team = Model.extend({
    baseUrl: "http://api.comicvine.com/team/",
    idAttribute: "id",
    modelName: 'Team',

    parse: function(response) {
        var collections = require('./../index.js').collections;
        var modelData = response.results?response.results:response;

        Model.transformData(modelData, {
            //aliases - List of aliases that the team is known by. A \n (newline) separates each alias.
            "aliases": function(data) { return data.split("\n") },

            //character_enemies - List of characters that are enemies with this team.
            "character_enemies": collections.Characters,

            //character_friends - List of characters that are friends with this team.
            "character_friends": collections.Characters,

            //characters - List of characters that are members of this team.
            "characters": collections.Characters,

            //creators - List of people that are credited as the creators of this team.
            "creators": collections.Persons,

            //date_added - Date the team was added to Comic Vine
            "date_added": function(data) { return new Date(data) },

            //date_last_updated - Date the team was last updated on Comic Vine
            "date_last_updated": function(data) { return new Date(data) },

            //disbanded_in_issues - List of issues this team disbanded in.
            "disbanded_in_issues": collections.Issues,

            //first_appeared_in_issue - Issue this team first appears in.
            "first_appeared_in_issue": collections.Issues,

            //issue_credits - List of issues this team appears in.
            "issue_credits": collections.Issues,

            //issues_disbanded_in - List of issues this team disbanded in.
            "issues_disbanded_in": collections.Issues,

            //movies - List of movies this team appears in.
            "movies": collections.Movies,

            //publisher - Primary publisher of this team.
            "publisher": collections.Publishers,

            //story_arc_credits - List of story arcs this team appears in.
            "story_arc_credits": collections.StoryArcs,

            //team_enemies - List of teams that are enemies of this team.
            "team_enemies": collections.Teams,

            //team_friends - List of teams that are friends of this team.
            "team_friends": collections.Teams,

            //volume_credits - List of comic volumes this team appears in.
            "volume_credits": collections.Volumes
        });

        //
        //Other fields saved without transformation:
        //
        //  api_detail_url                  URL pointing to the team detail resource
        //  count_of_issue_appearances      Number of issues this team appears in.
        //  count_of_team_members           Number of team members in this team.
        //  deck                            Brief summary of the team
        //  description                     Description of the team
        //  id                              Unique ID of the team
        //  image                           Main Image of the team
        //  name                            Name of the team
        //  site_detail_url                 URL pointing to the team on Comic Vine

        return modelData;
    }
});

module.exports = Team;
var Model = require('./../model.js'),
    Collection = require('./../collection.js');

var Issue = Model.extend({
    baseUrl: "http://api.comicvine.com/issue/",
    idAttribute: "id",
    modelName: 'Issue',

    parse: function(response) {
        var collections = require('./../index.js').collections;
        var modelData = response.results?response.results:response;

        Model.transformData(modelData, {
            //aliases - List of aliases that the volume is known by. A \n (newline) separates each alias.
            "aliases": function(data) { return data.split("\n") },

            //character_credits - List of characters that appear in this volume.
            "character_credits": collections.Characters,

            //characters_died_in - A list of characters that died in this issue.
            "characters_died_in": collections.Characters,

            //concept_credits - List of concepts that appear in this volume.
            "concept_credits": collections.Concepts,

            //date_added - Date the volume was added to Comic Vine
            "date_added": function(data) { return new Date(data) },

            //date_last_updated - Date the volume was last updated on Comic Vine
            "date_last_updated": function(data) { return new Date(data) },

            //disbanded_teams - A list of teams that disbanded in this issue.
            "disbanded_teams": collections.Teams,

            //first_appearance_characters - A list of characters in which this issue is the first appearance of the character.
            "first_appearance_characters": collections.Characters,

            //first_appearance_concepts - A list of concepts in which this issue is the first appearance of the concept.
            "first_appearance_concepts": collections.Concepts,

            //first_appearance_locations - A list of locations in which this issue is the first appearance of the location.
            "first_appearance_locations": collections.Locations,

            //first_appearance_objects - A list of objects in which this issue is the first appearance of the object.
            "first_appearance_objects": collections.Objcts,

            //first_appearance_storyarcs - A list of storyarcs in which this issue is the first appearance of the story arc.
            "first_appearance_storyarcs": collections.StoryArcs,

            //first_appearance_teams - A list of teams in which this issue is the first appearance of the team.
            "first_appearance_teams": collections.Teams,

            //location_credits - List of locations included in this issue.
            "location_credits": collections.Locations,

            //object_credits - List of objects included in this issue.
            "object_credits": collections.Objcts,

            //person_credits - List of people that worked on this issue.
            "person_credits": collections.Persons,

            //story_arc_credits - List of story arcs this issue appears in.
            "story_arc_credits": collections.Persons,

            //team_credits - List of teams included in this issue.
            "team_credits": collections.Teams,

            //teams_disbanded_in - List of teams that disband in this issue.
            "teams_disbanded_in": collections.Teams,

            //volume - The volume this issue is a part of.
            "volume": collections.Volumes
        });

        //publish_day - The day this issue was published.
        //publish_month - The month this issue was published.
        //publish_year - The year this issue was published.
        modelData["publish_date"] = new Date(modelData["publish_year"], (modelData["publish_month"]||1)-1, modelData["publish_day"]||1 );

        //
        //Other fields saved without transformation:
        //
        //  api_detail_url                  URL pointing to the volume detail resource
        //  deck                            Brief summary of the volume
        //  description                     Description of the volume
        //  has_staff_review
        //  id                              Unique ID of the volume
        //  image                           Main Image of the volume
        //  issue_number                    The number of the issue within the volume.
        //  name                            Name of the volume
        //  site_detail_url                 URL pointing to the volume on Comic Vine

        return modelData;
    }
});

module.exports = Issue;
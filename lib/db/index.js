module.exports = {
    collections:{
        Characters:new (require('./collections/characters.js'))(),
        Concepts:new (require('./collections/concepts.js'))(),
        Issues:new (require('./collections/issues.js'))(),
        Locations:new (require('./collections/locations.js'))(),
        Movies:new (require('./collections/movies.js'))(),
        Objcts:new (require('./collections/objcts.js'))(),
        Origins:new (require('./collections/origins.js'))(),
        Persons:new (require('./collections/persons.js'))(),
        Publishers:new (require('./collections/publishers.js'))(),
        Powers:new (require('./collections/powers.js'))(),
        StoryArcs:new (require('./collections/story_arcs.js'))(),
        Teams:new (require('./collections/teams.js'))(),
        Volumes:new (require('./collections/volumes.js'))()
    },
    Search: require('./search.js')
};
comicvine-client
----------------

ComicVine Client for remote API, based on Backbone

Features
========

* Exports ComicVine API resources as Backbone collections, ready to be consumed.
* Uses Redis for caching API responses.

Dependencies
============

* [Backbone](http://backbonejs.org/), used to map API Resources into objects
* [request](https://github.com/mikeal/request), used to make http requests to the API
* [caching](https://github.com/mape/node-caching), used to provide a redis caching layer


Usage
========

### Initialization

    var ComicVineClient = require('comicvine');

    var client = new ComicVineClient({
        //Example API key, insert your API key here. More info http://api.comicvine.com/
        apikey: "40ffdec6b2f84ffa415b5f24d289175ae907a6a1",

        //Base URL for all the API requets. Don't change it unless you are using your own proxy or something like that.
        apiUrl: "http://api.comicvine.com",

        //Use redis cache for http requests
        cache: 'redis',

        //Redis host
        host: "192.168.56.2",

        //Redis port
        port: 6379,
    });

or

     var ComicVineClient = require('comicvine');

     var client = new ComicVineClient({
         //Example API key, insert your API key here. More info http://api.comicvine.com/
         apikey: "40ffdec6b2f84ffa415b5f24d289175ae907a6a1",

         //Don't use cache
         cache: false
     });


It is **highly recommended** to not disable the cache. ComicVine API is not very fast and very verbose, so not using cache will definetly kill your performance.


### Get a paginated list of characters

    client.collections.pageSize = 20; //100 by default
    client.collections.Characters.fetch( {
        //Regular Backbone.Collection.fetch options here...
    });

    //...later...

    client.collections.Characters.fetchNextPage({
        //Regular Backbone.Collection.fetch options here...
    })


### Get all the list of characters

    //Don't even try this without a populated cache, will take ages
    client.collections.Characters.fetchAll({
        success: function(collection) {
            //Run this callback after all the collection has been retrieved
        },
        each: function(collection) {
            //Run this callback after each page retrieval (will be used as success callback for each fetchNextPage() call)
        },
        error: function(collection) {
            //Run this callback if there is any error (will be used as error callback for each fetchNextPage() call)
        }
    });

### Use API Search to find the real name of the best superhero ever

    var searchCollection = new client.Search("Batman","character");

    //Now searchCollection is a regular paginated collection. You can set pageSize, use .fetch(), .fetchNextPage()...
    searchCollection.fetchAll({
        success: function(results) {
            var batman = results.where({"name": "Batman"})[0];
            console.log( batman.get("real_name") );
        }
    })

Note that ComicVine Search is a bit too user-friendly: it will return any character with "Batman" or some variation in the name (like, "Bat-Man" or "Batmankoff"). Probably you will need to filter the resutling list on your own, using .filter() or .where().


### TODO

* Allow limit the number of fields returned in each request
* Add tests for fetchAll()
* Add a method to detect if a Model has been loaded completly
* Better error detection

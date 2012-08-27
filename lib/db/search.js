var backbone = require('backbone'),
    Collection = require('./collection.js');

var SearchCollection = Collection.extend({
    baseUrl: '/search/',
    pageSize: 20,
    total: 0,
    lastPage: -1,

    url: function(options) {
        var params = {
            "format": "json",
            "query": this.query
        };

        if (typeof options.page == "number") {
            params.offset = options.page*this.pageSize;
            params.limit = this.pageSize;
        }

        if (typeof this.resources == "string") {
            params.resources = this.resources;
        } else if (Array.isArray(this.resources)) {
            params.resources = this.resources.join(",");
        }

        var queryParams = [];
        for (var key in params) if (params.hasOwnProperty(key)) {
            queryParams.push( key+"="+params[key]);
        }
        return this.baseUrl + "?"+ queryParams.join("&");
    },

        /*
    loadAllItems: function(each) {
        var collection = this;
        this.invoke('fetch');
        function loadItem(item) {
            var model = collection.at(item);
            if (model) {
                model.fetch({success: function() {
                    each();
                    loadItem(item+1);
                }});
            }
        };
        //loadItem(0);
    },
    */

    parse: function(response) {
        this.isLoading = false;
        this.total = response["number_of_total_results"];
        this.lastPage = ((response["offset"]) / response["limit"]);
        //@todo parse results and create nested models

        var collections = require('./index.js').collections;
        var results = response.results;
        for (var i = 0, len=results.length; i<len; i++) {
            var item = results[i];
            var type = item["resource_type"];
            var convertedItem;
            switch (type) {
                case "character": convertedItem = collections.Characters.createItem(item); break;
                case "concept": convertedItem = collections.Concepts.createItem(item); break;
                case "origin": convertedItem = collections.Origins.createItem(item); break;
                case "object": convertedItem = collections.Objcts.createItem(item); break;
                case "location": convertedItem = collections.Locations.createItem(item); break;
                case "issue": convertedItem = collections.Issues.createItem(item); break;
                case "story_arc": convertedItem = collections.StoryArcs.createItem(item); break;
                case "volume": convertedItem = collections.Volumes.createItem(item); break;
                case "publisher": convertedItem = collections.Persons.createItem(item); break;
                case "person": convertedItem = collections.Persons.createItem(item); break;
                case "team": convertedItem = collections.Teams.createItem(item); break;
                default:
                    //Other types might be returned, ignore them
            }
            if (convertedItem) {
                response.results[i] = convertedItem;
            }
        }

        return response.results;
    },

    fetchNextPage: function(callbacks) {
        if (!this.isLoading) {
            this.fetch({
                page: this.lastPage+1,
                success: callbacks.success,
                error: callbacks.error,
                add: true
            });
            this.isLoading = true;
        }
    },
    hasMorePages: function() {
        return (this.total===0 || this.total > ((this.lastPage+1)*this.pageSize));
    },

    createItem: function(data) {
        var returnSingle = false;

        if (!Array.isArray(data)) {
            data = [data];
            returnSingle = true;
        }

        var result = [];
        for (var i = 0, len=data.length; i<len; i++) {
            var rawModel = data[i];
            var currentModel = this.get(rawModel.id);
            if (currentModel) {
                result[i] = currentModel;
            } else {
                result[i] = new this.model(rawModel);
                this.add(result[i]);
            }
        }

        return returnSingle?result[0]:result;
    }
});

module.exports = function(query, resources) {
    var collection = new SearchCollection();
    collection.query = encodeURIComponent(query);
    collection.resources = resources;
    return collection;
};
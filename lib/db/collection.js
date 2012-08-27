var backbone = require('backbone');

var Collection = backbone.Collection.extend({
    pageSize: 100,
    total: 0,
    lastPage: -1,
    ttl: 1000 * 60 * 60 * 24 * 7,
    url: function(options) {
        var url = this.baseUrl + "?format=json";

        if (typeof options.page == "number" || this.pageSize !== 100) {
            var offset = (options.page||0)*this.pageSize;
            var limit = this.pageSize;
            url += "&offset="+offset+"&limit="+limit;
        }

        return url;
    },

    fetchAll: function(callbacks) {
        var each = callbacks.each;
        var error = callbacks.error;
        var success = callbacks.success;
        var collection = this;

        function nextPage() {
            if (collection.hasMorePages()) {
                collection.fetchNextPage({
                    success:function(){
                        if (typeof each == "function") {
                            each(collection);
                        }
                        process.nextTick(nextPage);
                    },
                    error: error
                })
            } else {
                if (typeof success == "function") {
                    success(collection);
                }
            }
        }
        nextPage();
    },

    loadAllItems: function(each) {
        var collection = this;
        this.invoke('fetch');
        /*
        function loadItem(item) {
            var model = collection.at(item);
            if (model) {
                model.fetch({success: function() {
                    each();
                    loadItem(item+1);
                }});
            }
        };
        */
        //loadItem(0);
    },

    parse: function(response) {
        this.isLoading = false;
        this.total = response["number_of_total_results"];
        this.lastPage = (response["offset"] || response["limit"] / response["limit"]) - 1;
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
        return (this.total===0 || this.total > (this.lastPage*this.pageSize));
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


module.exports = Collection;
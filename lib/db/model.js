var backbone = require('backbone'),
    Collection = require('./collection.js');

var Model = backbone.Model.extend({
    ttl: 1000 * 60 * 60 * 24 * 7,
    url: function() {
        var url = this.get('api_detail_url') || this.baseUrl;
        url += "?format=json";
        return url;
    },

    toString: function() {
        return this.modelName + "("+ this.get('id') +") - " + this.get('name');
    },
    x: function() {
        return this.modelName + "("+ this.get('id') +") - " + this.get('name');
    }
});

Model.create = function(model, data) {
    var result;

    if (!Array.isArray(data)) {
        result = new model(data);
    }else{
        result = [];
        for (var i = 0, len=list.length; i<len; i++) {
            var rawModel = result[i];
            var currentModel = model.collection.get(rawModel.id);
            if (currentModel) {
                result[i] = currentModel;
            } else {
                result[i] = new this(list[i]);
            }

            result[i] = new this(list[i]);
        }
    }

    return result;
};

Model.transformData= function(data , transforms) {
    for (var key in transforms) if (transforms.hasOwnProperty(key)) {
        var transform = transforms[key];
        if (data[key]) {
            if (transform instanceof Collection) {
                data[key] = transform.createItem(data[key]);
            }else if (typeof transform === "function") {
                data[key] = transform(data[key]);
            }
        }
    }
};

module.exports = Model;
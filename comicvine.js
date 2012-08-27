var request = require('request'),
    backbone = require('backbone'),
    Caching = require('caching'),
    models = require('./lib/db'),
    UrlBuilder = require('./lib/urlbuilder.js'),
    RequestBuilder = require('./lib/requestbuilder.js'),
    SyncBuilder = require('./lib/syncbuilder.js');


/**
 * ComicVine API
 * @param config {Object} Config object
 *

 * @cfg cache {Boolean/Caching} Caching function compatible with node-caching
 *
 * @return {*}
 * @constructor
 */
var ComicVine = function(config) {
    var apikey,
        cache,
        apiUrl;

    /*
     * @cfg apikey {String} ComicVine API Key
     */
    if (!config.apikey) throw new Error ("ComicVine API key not found. Did you use the 'apikey' config option?");
    apikey = config.apikey;


    /*
     * @cfg cache {Boolean/String} Use 'redis' or 'memory' to use different caches. Use false to disable the caching system.
     * @cfg host {Number} Redis server host, mandatory if cache=='redis'.
     * @cfg port {Number} Redis server port, mandatory if cache=='redis'.
     */
    if (config.cache===false) {
        cache = false;
    } else if (typeof config.cache == "string") {
        if (config.cache == "redis") {
            if (typeof config.port !== "number") throw new Error ("Invalid port. If you use 'redis' cache, be sure to specify the Redis server port");
            if (typeof config.host !== "string") throw new Error ("Invalid host. If you use 'redis' cache, be sure to specify the Redis server host");
            cache =  new Caching("redis", { host: config.host, port: config.port });
        }else if (config.cache == "memory") {
            cache =  new Caching("memory");
        } else {
            throw new Error ("Unknow cache mechanism '"+config.cache+"'. Please, use 'redis' or 'memory'");
        }
    }else {
        throw new Error ("Cache info not found. If you wan't to disable cache, use cache:false config option.");
    }

    /**
     * @cfg apiUrl {String} (Optional) Base URl to use for the API requests (defaults to 'http://api.comicvine.com'). Only useful if you are using your own mirror.
     */
    if (typeof config.apiUrl !== "string") {
        apiUrl = "http://api.comicvine.com";
    } else {
        apiUrl = config.apiUrl;
    }

    var urlBuilder = new UrlBuilder(apikey, apiUrl);
    var requestBuilder = new RequestBuilder(urlBuilder,request);
    var syncBuilder = new SyncBuilder(urlBuilder, requestBuilder , cache);

    backbone.sync = syncBuilder.build();

    return models;
}

module.exports = ComicVine;
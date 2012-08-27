var URL = require('url');

module.exports = function(apikey, host) {
    return {
        /**
         * Creates a ComicVine API URL using a model
         * @param model {backbone.Model} Model to create URL for
         * @param options {object} Options
         * @param host {String} (Optional) Host to use for the API (defaults to 'http://api.comicvine.com')
         * @return {String} URL
         */
        build: function(model, options) {
            //Get URL from the model
            var url = (typeof model.url === "function")?model.url(options):model.url;

            //Append host if necesary
            if (!url.match("^http")) url = host + url;

            return url;
        },

        /**
         * Makes sure the URL has an API Key. If not, append the API Key to the URL.
         * @param url {String} URL to check
         * @return {String} URL with API Key
         */
        ensureApiKey: function(url) {
            var parsed = URL.parse(url, true);
            if (parsed.query["api_key"] === apikey) {
                return url;
            } else {
                parsed.query["api_key"]=apikey;
                //URL.format() will ignore query if search is present. So bad :(
                delete parsed.search;
                return URL.format(parsed);
            }
        }
    }
}

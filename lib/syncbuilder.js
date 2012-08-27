module.exports = function(urlBuilder, requestBuilder, cache) {
    var _buildCallbacks = function(options) {
        return function (err, results) {
            if (err && options.error) {
                options.error(err);
            }
            if (!err && results) {
                options.success(results);
            }
        }
    };

    return {
        build: function() {
            return function(method, model, options){
                var url = urlBuilder.build(model, options);
                var request = requestBuilder.build(url);
                var callbacks = _buildCallbacks(options);

                if (cache && options.cache!==false) {
                    cache(url, model.ttl, request, callbacks);
                }else{
                    request(callbacks);
                }
            }
        }
    }
}

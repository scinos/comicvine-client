module.exports = function(urlBuilder, request) {

    return {
        build: function (url) {
            return function (callback) {
                var urlWithAPI = urlBuilder.ensureApiKey(url);
                request(urlWithAPI, function (err, response, body) {
                    if (err) {
                        callback(err, null);
                    } else if (response.headers["content-type"] == "text/javascript") {
                        callback(null, JSON.parse(body));
                    } else {
                        callback(new Error("ComicVine API returned an invalid response"), null);
                    }
                });
            }
        }
    }
}

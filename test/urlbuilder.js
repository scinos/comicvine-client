var should = require("should");

describe('UrlBuilder', function(){

    var urlBuilder = require('../lib/urlbuilder.js');
    it("should provide a constructor", function() {
        urlBuilder.should.be.a("function");
    });

    describe('.build', function() {
        var url = urlBuilder('test_api_key','http://example.com');

        it("should build a static url", function() {
            var model = { url: '/test/' };
            var result = url.build(model);
            result.should.equal("http://example.com/test/");
        });

        it("should build a simple function", function() {
            var model = { url: function() { return '/test/'} };
            var result = url.build(model);
            result.should.equal("http://example.com/test/");
        });

        it("should pass options to the function", function() {
            var model = { url: function(options) { return options.path} };
            var result = url.build(model, {path: "/test/" });
            result.should.equal("http://example.com/test/");
        });
    });

    describe('.ensureApiKey', function() {
        var url = urlBuilder('test_api_key','http://example.com');

        it("should not change urls that already have an api_key", function() {
            url.ensureApiKey("http://example.com/?api_key=test_api_key").should.be.equal("http://example.com/?api_key=test_api_key");
        });

        it("should correct wrong api_keys", function() {
            url.ensureApiKey("http://example.com/?api_key=yyy").should.be.equal("http://example.com/?api_key=test_api_key");
        });

        it("should append the api_key if missing", function() {
            url.ensureApiKey("http://example.com/?test=test_api_key").should.be.equal("http://example.com/?test=test_api_key&api_key=test_api_key");
        });
    })

});

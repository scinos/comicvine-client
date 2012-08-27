var should = require("should");

var syncBuilder = require('../lib/syncbuilder.js');

describe('SyncBuilder', function(){
    describe('.build', function() {

        var urlBuilder = require('../lib/urlbuilder.js')('test_api_key', "http://example.com");
        var model = { url: function() { return '/test/'}, ttl: 100 }

        it("should create a function", function() {
            (new syncBuilder()).build().should.be.a("function");
        })

        it("should use the provided modules", function(done) {
            this.timeout(50);

            var request = function(url) {
                url.should.equal("http://example.com/test/?api_key=test_api_key");
                done();
            }
            var requestBuilder = require('../lib/requestbuilder.js')(urlBuilder,request);
            var sync = (new syncBuilder(urlBuilder,requestBuilder)).build();
            sync(null,model);
        });

        it("should use the cache if present", function(done) {
            this.timeout(500);

            var request = function(url) {return url};
            var requestBuilder = require('../lib/requestbuilder.js')(urlBuilder,request);
            var cache = function(url, ttl, request, callbacks) {
                url.should.equal("http://example.com/test/");
                ttl.should.equal(100);
                request.should.be.a("function");
                callbacks.should.be.a("function");
                done();
            }
            var sync = (new syncBuilder(urlBuilder,requestBuilder,cache)).build();
            sync(null,model,cache);
        });

        it("should ignore the cache if disabled by options", function(done) {
            this.timeout(500);

            var request = function(url) {
                url.should.equal("http://example.com/test/?api_key=test_api_key");
                done();
            }
            var requestBuilder = require('../lib/requestbuilder.js')(urlBuilder,request);
            var cache = function(url, ttl, request, callbacks) {
                should.fail("Cache called!");
            }
            var sync = (new syncBuilder(urlBuilder,requestBuilder,cache)).build();
            sync(null,model,{cache: false});
        });

    });
});

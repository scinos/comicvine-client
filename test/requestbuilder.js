var should = require("should");

var requestBuilder = require('../lib/requestbuilder.js');
var urlBuilder = require('../lib/urlbuilder.js')('test_api_key');

describe('RequestBuilder', function(){
    describe('.build', function() {

        it("should create a function", function() {
            requestBuilder().build().should.be.a("function");
        });


        it("should use the provided modules", function(done) {
            this.timeout(50);
            var request = function(url) {
                url.should.equal("http://example.com/?api_key=test_api_key");
                done();
            };
            new requestBuilder(urlBuilder,request).build("http://example.com")()
        });


        it("should pass the error to the callback", function(done) {
            this.timeout(50);
            var request = function(url, cb) {
                cb(new Error("test"));
            };

            new requestBuilder(urlBuilder,request).build("http://example.com")(function(err, data){
                should.not.exist(data);
                err.should.be.an.instanceof(Error);
                done();
            });
        });

        it("should pass the data to the callback", function(done) {
            this.timeout(50);
            var request = function(url, cb) {
                cb(null, {headers:{"content-type":"text/javascript"}}, '{"a":123}');
            };

            new requestBuilder(urlBuilder,request).build("http://example.com")(function(err, data){
                should.not.exist(err);
                data.should.be.a("object");
                data.a.should.be.equal(123);
                done();
            });
        });

        it("should detect bad responses", function(done) {
            this.timeout(50);
            var request = function(url, cb) {
                cb(null, {headers:{"content-type":"broken"}}, '{"error":123}');
            };

            new requestBuilder(urlBuilder,request).build("http://example.com")(function(err, data){
                should.not.exist(data);
                err.should.be.an.instanceof(Error);
                err.toString().should.be.equal("Error: ComicVine API returned an invalid response");
                done();
            });
        });

    });
});

var should = require("should"),
    backbone = require("backbone"),
    fs = require("fs"),
    _ = require("underscore"),
    db = require('../lib/db/index.js');

describe('Models', function(){
    describe(".collections", function() {

        it('should be a list of items', function(){
            db.collections.should.be.a("object");
        });

        it('should contain only instances of backbone Collections', function(){
            _.each(db.collections, function(item) {
                item.should.be.a("object").and.be.an.instanceof(backbone.Collection);
            })
        });
    });

    describe(".Search", function() {
        it('should be created', function(){
            db.Search.should.be.a("function");
        });
        it('should accept a search and a set of resources created', function(){
            db.Search.length.should.equal(2)
        });
        it('should create a instance of a backbone Collection', function(){
            (new db.Search()).should.be.an.instanceof(backbone.Collection);
        });
    })

});
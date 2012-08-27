var should = require("should"),
    backbone = require("backbone"),
    fs = require("fs"),
    db = require('../lib/db/index.js');

describe('Models', function(){
    describe(".collections", function() {

        it('should be a list of items', function(){
            db.collections.should.be.a("object");
        });

        it('should contain only instances of backbone Collections', function(){
            for (var col in db.collections) if (db.collections.hasOwnProperty(col)) {
                var item = db.collections[col];
                item.should.be.a("object").and.be.an.instanceof(backbone.Collection);
            }
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
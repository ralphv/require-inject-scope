'use strict';

const should = require("should");

describe('testing', function() {
  this.timeout(0);

  it('calling require to override it', function(done) {
    require("../");
    done();
  });

  it('testing standard require', function(done) {
    const result = require("./file1");
    should.equal(result, 10);
    done();
  });

  it('testing require with $config injected', function(done) {
    const result = require(["./file2", {$config: {exampleValue: 22}}]);
    should.equal(result, 22);
    done();
  });

  it('testing require with wrong parameters', function(done) {
    try {
      require(["./file2"]);
      done(new Error("require did not fail"));
    }
    catch (e) {
      should.equal(e.message, "require-inject-scope: require with scope injection needs 2 parameters.");
      done();
    }
  });

});


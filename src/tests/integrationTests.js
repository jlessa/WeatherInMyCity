var should = require('should'),
    request = require('supertest'),
    app = require('../../app.js'),
    agent = request.agent(app);

describe('API Test Connection', function () {
    it('Should get Data from Weather Api', function (done) {
        var cityString = 'Rio de Janeiro';

        agent.post('/?city=' + cityString)            
            .expect(200)
            .end(function (err, results) {                
                results.body.should.not.null();
                results.status.should.equal(200);
                results.text.should.containEql('<div class=\"location\">Rio de Janeiro, BR</div>');
                done();
            });
    });

    afterEach(function (done) {
        done();
    });
});
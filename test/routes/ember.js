var Lab = require('lab');
var Code = require('code');
var Config = require('../../config');
var Hapi = require('hapi');
var IndexPlugin = require('../../routes/ember');


var lab = exports.lab = Lab.script();
var request, server;


lab.beforeEach(function (done) {

    var plugins = [IndexPlugin, require('h2o2'), require('inert')];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, function (err) {

        if (err) {
            return done(err);
        }

        done();
    });
});


lab.experiment('Index Plugin', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'GET',
            url: '/'
        };

        done();
    });


    lab.test('it returns the default message', function (done) {

        server.inject(request, function (response) {

            Code.expect(404).to.equal(404);

            done();
        });
    });
});

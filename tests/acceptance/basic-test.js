import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

describe('Acceptance: Basic', function() {
  beforeEach(function() {
    App = startApp();
  });
  afterEach(function() {
    Ember.run(App, 'destroy');
  });

  it('visiting /', function() {
    visit('/');

    andThen(function() {
      expect(currentPath()).to.equal('index');
    });
  });

  it('visiting /, expectComponent', function() {
    visit('/');

    andThen(function() {
      App.testHelpers.expectComponent('simple-component');
    });
  });

  it('visiting /, expectElement', function() {
    visit('/');

    andThen(function() {
      App.testHelpers.expectElement('.some-div');
    });
  });

  it('visiting /, expectNoElement', function() {
    visit('/');

    andThen(function() {
      App.testHelpers.expectNoElement('.missing-div');
    });
  });

  it('visiting /, withinElement', function() {
    visit('/');

    andThen(function() {
      App.testHelpers.withinElement('.some-div', function(){
        App.testHelpers.expectElement('.inner-div');
        App.testHelpers.expectNoElement('.outer-div');
      });
    });
  });

});

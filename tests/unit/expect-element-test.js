import expectElement from '../helpers/201-created/raw/expect-element';

describe('Unit - expectElement', function() {

  it('exists', function(){
    expect(expectElement, 'it exists').to.exist();
  });

  function makeElement(elementType, options){
    var el = $(document.createElement(elementType));
    if (options.class) { el.addClass('class', options.class); }
    if (options.text)  { el.text(options.text); }

    return el.get(0);
  }

  function makeElements(elementType, options, count){
    var els = [];
    for (var i = 0; i < count; i++) {
      els.push(makeElement(elementType, options));
    }

    return $(els);
  }

  function makeApp(findFn){
    return {
      testHelpers: { find: findFn },
      $: $
    };
  }

  it('passes when the element is found by app.testHelpers.find', function(){
    var find = function(){
      return [makeElement('div', {class:'the-div'})];
    };

    var app = makeApp(find);

    var result = expectElement(app, '.the-div');

    expect(result.ok, 'passes').to.equal(true);
    expect(result.message).to.equal('Found 1 of .the-div');
  });

  it('fails when the element is not found by app.testHelpers.find', function(){
    var find = function(){
      return [];
    };

    var app = makeApp(find);

    var result = expectElement(app, '.the-div');

    expect(!result.ok, 'fails').to.equal(true);
    expect(result.message).to.equal('Found 0 of .the-div but expected 1');
  });

  it('calls app.testHelpers.find with the given selector', function(){
    expect(1);

    var find = function(selector){
      expect(selector).to.equal('.the-div');
      return [];
    };

    var app = makeApp(find);

    expectElement(app, '.the-div');
  });

  it('can be passed a number', function(){
    var find = function(){
      return makeElements('div', {class:'the-div'}, 2);
    };

    var app = makeApp(find);

    var result = expectElement(app, '.the-div', 2);

    expect(result.ok, 'passes').to.equal(true);
    expect(result.message, 'correct success message').to.equal('Found 2 of .the-div');

    // default: 1
    result = expectElement(app, '.the-div');

    expect(!result.ok, 'fails').to.equal(true);
    expect(result.message, 'correct failure message').to.equal('Found 2 of .the-div but expected 1');

    result = expectElement(app, '.the-div', 3);

    expect(!result.ok, 'fails').to.equal(true);
    expect(result.message, 'correct failure message').to.equal('Found 2 of .the-div but expected 3');
  });

  it('takes option `contains`', function(){
    var find = function(){
      return makeElements('div', {class:'the-div', text: 'foo bar'}, 1);
    };

    var app = makeApp(find);

    var result = expectElement(app, '.the-div', {contains:'foo'});

    expect(result.ok, 'passes').to.equal(true);
    expect(result.message).to.equal('Found 1 of .the-div containing "foo"');

    result = expectElement(app, '.the-div', {contains:'not found'});

    expect(!result.ok, 'fails').to.equal(true);
    expect(result.message).to.equal('Found 1 of .the-div but 0/1 containing "not found"');
  });

  it('can be passed a number and option `contains`', function(){
    var find = function(){
      return makeElements('div', {class:'the-div', text: 'foo bar'}, 3);
    };

    var app = makeApp(find);

    var result = expectElement(app, '.the-div', 3, {contains:'foo'});

    expect(result.ok, 'passes').to.equal(true);
    expect(result.message, 'Found 3 of .the-div containing "foo"');

    result = expectElement(app, '.the-div', 3, {contains:'not found'});

    expect(!result.ok, 'fails').to.equal(true);
    expect(result.message).to.equal('Found 3 of .the-div but 0/3 containing "not found"');
  });

  it('option `contains` filters the elements', function(){
    var find = function(){
      return $([
        makeElement('div', {class:'the-div'}),
        makeElement('div', {class:'the-div', text: 'foo bar'})
      ]);
    };

    var app = makeApp(find);

    var result = expectElement(app, '.the-div', {contains:'foo'});

    expect(result.ok, 'passes').to.equal(true);
    expect(result.message).to.equal('Found 1 of .the-div containing "foo"');

    result = expectElement(app, '.the-div', {contains:'not found'});

    expect(!result.ok, 'fails').to.equal(true);
    expect(result.message).to.equal('Found 2 of .the-div but 0/1 containing "not found"');
  });

});

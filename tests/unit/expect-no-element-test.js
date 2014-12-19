import expectNoElement from '../helpers/201-created/raw/expect-no-element';

describe('Unit - expectNoElement', function() {

  it('expectNoElement exists', function(){
    expect(expectNoElement, 'it exists').to.exist();
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

  it('passes when the element is not found by app.testHelpers.find', function(){
    var find = function(){
      return [];
    };

    var app = makeApp(find);

    var result = expectNoElement(app, '.the-div');

    expect(result.ok, 'passes').to.exist();
    expect(result.message).to.equal('Found 0 of .the-div');
  });

  it('fails when the element is found by app.testHelpers.find', function(){
    var find = function(){
      return [makeElement('div', {class:'the-div'})];
    };

    var app = makeApp(find);

    var result = expectNoElement(app, '.the-div');

    expect(!result.ok, 'fails').to.exist();
    expect(result.message).to.equal('Found 1 of .the-div but expected 0');
  });

  it('takes option `contains`', function(){
    var find = function(){
      return makeElements('div', {class:'the-div', text: 'foo bar'}, 1);
    };

    var app = makeApp(find);

    var result = expectNoElement(app, '.the-div', {contains:'boo'});

    expect(result.ok, 'passes').to.exist();
    expect(result.message).to.equal('Found 0 of .the-div containing "boo"');

    result = expectNoElement(app, '.the-div', {contains:'foo'});

    expect(!result.ok, 'fails').to.exist();
    expect(result.message).to.equal('Found 1 of .the-div containing "foo" but expected 0');
  });

});

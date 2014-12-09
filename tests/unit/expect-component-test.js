import expectComponent from '../helpers/201-created/raw/expect-component';

describe('Unit - expectComponent', function() {

  it('it exists', function(){
    expect(expectComponent, 'it exists').to.exist();
  });

  function makeContainer(key, value){
    return {
      lookupFactory: function(_key){
        if (key === _key) { return value; }
      }
    };
  }

  function makeApp(findFn, componentName, componentKlass){
    return {
      testHelpers: { find: findFn },
      __container__: makeContainer(componentName, componentKlass),
      $: $
    };
  }

  it('fails if the component is not in the container', function(){
    var findFn = function(){};
    var DatePicker = function(){};

    var app = makeApp(findFn, 'component:date-picker', DatePicker);

    var result = expectComponent(app, 'non-existent');
    expect(!result.ok, 'fails').to.equal(true);
    expect(result.message).to.equal('No component called non-existent was found in the container');
  });

  // 'fails is the component is found but destroyed'
  // 'fails if > 1 components are found but `count` is not specified'
  // 'passes if 1 component is found and it is not destroyed'
  // 'passes if `count` components are found'
});

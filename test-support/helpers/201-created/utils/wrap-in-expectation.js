/* global ok */
export default function(helperFn){
  return function(){
    var result = helperFn.apply(null, arguments);

    expect(result.ok, result.message).to.equal(true);
  };
}

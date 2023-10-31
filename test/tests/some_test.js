const someTest = {
  title: 'someTest',
  tests: [],
  defaultProcess(fn= (()=>true), params, expected){
    if(fn(...params)===expected) return true;
    else {
      throw new Error("unexpected result");
    }
  }
}, { tests } = someTest;

with(tests){

  push({
    name: 'with a simple string',
    result: "toto", // required if process is not set
    params: ["toto"]
  })
  
  push({
    name: 'with an object',
    process(target, params, expected){
      try {
        someTest.defaultProcess(...arguments)
      } catch (err) {
        if(err.message === expected) return true;
        console.error(err)
      }
      throw new Error("unexpected result");
    }, // required if result is not set
    params: [false],
    result: "The token provided contains HTML space characters, which are not valid in tokens."
  })
  
}

module.exports = someTest
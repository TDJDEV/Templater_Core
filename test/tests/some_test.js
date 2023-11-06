const someTest = {
  title: 'someTest',
  tests: [],
  path: 'components/default.js',
  key: 'default',
  defaultProcess(fn= (()=>true), params, expected){
    console.log('defaultProcess =>',arguments)
    if(fn(...params)===expected) return true;
    else {
      throw new Error("unexpected result");
    }
  }
}, { tests } = someTest;

  tests.push({
    name: 'with a simple string',
    result: "toto", // required if process is not set
    params: ["toto"]
  })
  
  tests.push({
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

export default someTest
import module from "../../src/components/default.js";
const someTest = {
  title: 'someTest 2',
  tests: [],
  // path: 'components/default.js',
  // key: 'default',
  module,
  defaultProcess(mod, params, expected){
    console.log(mod)
    if(params[0] === expected) return true;
    else {
      throw new Error("unexpected result");
    }
  }
}, { tests } = someTest;

  tests.push({
    name: 'with a simple string',
    expected: "toto", // required if process is not set
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
    expected: "unexpected result"
  })

export default someTest
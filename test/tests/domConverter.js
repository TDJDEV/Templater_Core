import { hooks , childHandler } from "../hooks.js";
// import data from "../data.json";
// import module from "../../src/components/default.js";
// import DOMConverter from "../../src/";

const someTest = {
  title: 'someTest 2',
  tests: [],
  path: 'converters/DOM.js',
  // module: DOMConverter,
  defaultProcess(mod, params, expected){
    mod(...params)
    if(params[0] === expected) return true;
    else {
      throw new Error("unexpected result");
    }
  }
}, { tests } = someTest;

// const T1 = []
// tests.push({
//   name: 'with a simple string',
//   expected: "toto", // required if process is not set
//   params: [data.TemplateA, childHandler(T1), hooks(T1)]
// })

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
  params: [{type: 'input'}, ()=>[]],
  expected: "unexpected result"
})

export default someTest
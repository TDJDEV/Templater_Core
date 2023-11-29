const someTest = {
  title: 'someTest 2',
  tests: [],
  path: 'converters/DOM.js',
  // module: DOMConverter,
  defaultProcess(mod, params, expected){
    const res = mod(params[0])
    if(res === expected) return true;
    else {
      throw new Error("unexpected result");
    }
  }
}, { tests } = someTest;

const T1 = []
tests.push({
  name: 'Simple conversion',
  expected:`<div id="lmt" onClick={Test} style={{color:"red",font-size:"10px"}}><p className="text">This is a test<label htmlFor="username">is a label</label></p></div>`, 
  params: [`<div id="lmt" onclick="Test" style="color: red; font-size: 10px;"><p class="text">This is a test<label for="username">is a label</label></p></div>`]
})

export default someTest

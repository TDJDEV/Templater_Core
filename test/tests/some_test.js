const someTest = {
  title: 'someTest',
  words: ['add','class'],
  targets: ['elem', 'collection', 'nodelist'],
  tests: [],
  defaultProcess(target, { params, result }){
    target.someTest(...params)
    const results = (target.length ? [...target] : [target]).reduce((acc, elem)=>{
      
      return acc.results.push(elem.className), acc.check.push(elem.classList.contains(result)), acc
    }, {results: [],check: []});
    if(results.check.every(bool=>bool)) return true;
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
    name: 'with a number string',
    result: "1", // required if process is not set
    params: ["1"]
  })
  
  push({
    name: 'with a string with space',
    process(){
      try {
        someTest.defaultProcess(...arguments)
      } catch (err) {
        if(err.message === "The token provided contains HTML space characters, which are not valid in tokens.") return true;
        console.error(err)
      }
      throw new Error("unexpected result");
    }, // required if result is not set
    params: ["toto 2"]
  })
  
  push({
    name: 'with an object',
    process(target, {result}){
      try {
        someTest.defaultProcess(...arguments)
      } catch (err) {
        if(err.message === result) return true;
        console.error(err)
      }
      throw new Error("unexpected result");
    }, // required if result is not set
    params: [{toto:true}],
    result: "The token provided contains HTML space characters, which are not valid in tokens."
  })
  
}

module.exports = someTest
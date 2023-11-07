import assert from 'assert';
import Tools from '../tools/index.mjs';

const
  counter = [],
  {argv, cwd} = process,
  root = cwd();

const args = argv.slice(argv.indexOf('test/index.js')+1)
const { reduceDir } = Tools
const features = browseDir(`${root}/test/tests/*`)

async function reducer(o, dirent) {
  const { name, path } = dirent, url=`${path}/${name}`;
  let value = await (dirent.isDirectory() ? browseDir(url+'/*') : readFile(url));
  
  return addToBank(
    await o, // get accumulator object
    name.split('.')[0], // get property key
    // get property value
    value.path 
      ? addToBank(value, "module", await readFile(`${root}/src/${value.path}`))
      : value
  )
}

function addToBank(o, key, val) { return (o[key] = val), o }
function browseDir(path){ return reduceDir(path, reducer, {}) }
function readFile(path, key='default'){ return import(path).then(x=>x[key]) }

function describeCategory([name, items]){
  describe(items.title || name, async () => {
    !items.tests?.length ? Object.entries(items).forEach(describeCategory) : testFeature(items)
  })
}

function testFeature({ tests, defaultProcess, title, module }){
  counter.push(title)
  if(!Array.isArray(tests)) {
    throw new Error(`tests must be an array: tests => ${tests} at ${title||this}`)
  }

  tests.forEach(({name, process, params = [], expected}) => {
    it(name, () => assert((process||defaultProcess)(module, params, expected)) )
  })
}

async function initTest(name, promise){
  const o = await promise
  describe(name, () => {
    Object.entries(typeof o === "function" ? (current = o(counter)): o).forEach(describeCategory)
    typeof o !== "function" && console.log("feature number => ",counter.length)
  })
  run()
}

async function filter(arr) {
  arr = await arr
  return args.length ? args.reduce((acc, key)=>(arr[key] && (acc[key] = arr[key]), acc), {}) : arr;
}
// const config = ((i)=> i>=0 ? !args.splice(i, 1)[0] : !0)(args.indexOf("no-config"))

const tests = filter(features)
initTest('tests', tests)
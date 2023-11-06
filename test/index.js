import * as assert from 'assert';
import Tools from '../tools/index.mjs';

const
  counter = [],
  root = process.cwd(),
  dirname = `${root}/src/`;

const [a,b, c, ...args] = process.argv
const { reduceDir } = Tools
const features = browseDir(`${root}/test/tests/*`)

console.log(features)
async function reducer(o, dirent) {
  const { name, path } = dirent, url=`${path}/${name}`;

  let value;
  if (dirent.isDirectory()){
    value = await browseDir(url+'/*');
  } else {
    value = await readFile(url);
    value.module = await getModule(value.path,value.key)
  }

  addToBank(await o, name.split('.')[0], value)
  return o;
}

function addToBank(o, key, val) { return o[key] = val }

function browseDir(path){ return reduceDir(path, reducer, {}) }

// function browseDir(path, fn){
//   // return fs.readdirSync(path,{ withFileTypes: true }).reduce((o, dirent) => {
//   return readdirSync(path,{ withFileTypes: true }).reduce((o, dirent) => {
//     const { name, path } = dirent
//     return o[name.split('.')[0]] = await((dirent.isDirectory() ? browseDir : readFile)(path+'/'+name, fn)), o;
//   }, {})
// }

function readFile(path, key='default'){ return import(path).then(x=>x[key]) }
function getModule(path,key) { return readFile(dirname+path,key) }


function describeCategory([name, items]){
  
  describe(items.title || name, async () => {
    if(!items.tests?.length) Object.entries(items).forEach(describeCategory);
    else testFeature.bind(name)(items, await getModule(items.path, items.key))
  })
}

function testFeature({ tests, defaultProcess, title }, module){
  
  counter.push(items.title)
  if(!Array.isArray(tests)) {
    throw new Error(`tests must be an array: tests => ${tests} at ${title||this}`)
  }

  tests.forEach(({name, process, params = [], expected}) => {
    it(name, () => assert((process||defaultProcess)(module, params, expected)) )
  })
}

async function initTest(name, promise){
  console.log("toto")
  console.log(promise)
  const o = await promise
  console.log(o, promise)
  describe(name, () => {
    Object.entries(typeof o === "function" ? (current = o(counter)): o).forEach(describeCategory)
    typeof o !== "function" && console.log("feature number => ",counter.length)
  })
  run()
}

async function filter(arr) {
  return args.length ? args.reduce((acc, key)=>(arr[key] && (acc[key] = arr[key]), acc), {}) : arr;
}
// const config = ((i)=> i>=0 ? !args.splice(i, 1)[0] : !0)(args.indexOf("no-config"))

const tests = filter(features)
console.log(tests)
initTest('tests', tests)
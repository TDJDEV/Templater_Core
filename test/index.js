const
  assert = require('assert'),
  [a,b, c, ...args] = process.argv,
  fs = require('fs'),
  JSDOM = require('jsdom').JSDOM,
  {General, ...testBank} = browseDir('test/tests'),
  otorp = fs.readFileSync('./dist/otorp.min.js', 'utf8'),
  counter = [],
  defaultTargetGetter = newTargetGetter();

let current;

function randomHTML(i){
  const tags = [
    'div',
    'main',
    'header',
    'footer',
    'section',
    'nav',
  ]
  const tag = tags[Math.floor(Math.random() * tags.length)]
  return `<${tag} id="item${i}"></${tag}>`
}
function getCollectionSource(doc,tag){
  const collectionSource = doc.createElement(tag||'div');
  collectionSource.innerHTML = new Array(10).fill().map(randomHTML).join("")
  return collectionSource
}
function createInstanceGenerator(window){
  const {Array, Number, document:doc} = window;
  return (query) => {
    const [word,name] = query.split('.');
    switch (word) {
      case "root": return window;
      case "document": return doc;
      case "elem": return getCollectionSource(doc,name);
      case "collection": return getCollectionSource(doc).children;
      case "nodelist": return getCollectionSource(doc).childNodes;
      case "array": return new Array(..."abcdefghijklmnopqrstuvwxyz");
      case "number": return new Number(Math.random() * 10);
      default: throw new Error("unknow target type");
    }
  }
}
function newTargetGetter(html){
  return createInstanceGenerator(
    getWindow(
      `
        <html>
          <head>
            ${html}
            <script>${otorp}</script>
          </head>
          <body></body>
        </html>
      `,
      {
        url: 'http://localhost/otorp/mocha/',
        runScripts: "dangerously"
      }
    )
  )
}
function browseDir(path, fn){
  return fs.readdirSync(path,{ withFileTypes: true }).reduce((o, dirent) => {
    const { name, path } = dirent
    return o[name.split('.')[0]] = ((dirent.isDirectory() ? browseDir : readFile)(path+'/'+name, fn)), o;
  }, {})
}

function readFile(path){ return require('../'+path) }

function getWindow(){	return new JSDOM(...arguments).window }

function describeCategory([name, items]){
  const bool = !!(testBank[name] || current && current[name])
  
  describe(items.title || name, () => {
    const targetGetter = items.html ? newTargetGetter(items.html) : this;
    if(bool) Object.entries(items).forEach(describeCategory.bind(targetGetter));
    else testFeature.bind(name)(items, targetGetter);
  })
}

function testFeature({ tests, targets, defaultProcess, words, title }, getInstance){
  words && words.every(entry => Array.isArray(entry))
    ? counter.push(...words.map(params=> ({params, targets})))
    : counter.push({params: words, targets})
  
  if(!Array.isArray(tests)) {
    console.log(...arguments)
    throw new Error(`tests must be an array: tests => ${tests} at ${title||this}`)
  }
  targets.forEach(target => tests.forEach(({name, process, params = [], result, targets = []}) => {
    if(targets.length && !targets.includes(target)) return;
    it(`${target}: ${name}`, () => {
      assert((process||defaultProcess)(getInstance(target), {params, result}, getInstance('root')))
    })
  }))
}

function initTest(name, o){
  describe(name, () => {
    Object.entries(typeof o === "function" ? (current = o(counter)): o).forEach(describeCategory.bind(defaultTargetGetter))
    typeof o !== "function" && console.log("feature number => ",counter.length + Object.keys(General).length)
  })
}

const config = ((i)=> i>=0 ? !args.splice(i, 1)[0] : !0)(args.indexOf("no-config"))

const features = args.length ? args.reduce((acc, key)=>(testBank[key] && (acc[key] = testBank[key]), acc), {}) : testBank;

initTest('prototype addition', features)

config && Object.entries(General).forEach(args => initTest(...args))


const
  checkers = new Map, // list of specialised checking methods
  checker = checkers.get.bind(checkers), // shorcut to the "get" method of the Map "checkers"
  entries = Object.entries
;

console.log(document.body, document)
let addAttr = document.body.setAttribute;


// Default checking methods for attributes without a specialised one
function defaultChecker(value) { return typeof value === 'string' }
// Check the attribute
function checkAttr(attr, value) { return (checker(attr) || defaultChecker)(value) }
// Check if
function checkCustom(o, key) { return !o[key] }


// Convert an object in HTMLElement
export default function (data, childHandler, {before, after}){
  const

    { type:tag, attrs, custom } = before(data),
    // create HTMLElement
    elem = document.createElement(tag)
  
  addAttr = addAttr.bind(elem)
  // Loop on attributes
  try{
    entries(attrs||{}).forEach(([name, value])=>{
      // check attribute
      !checkAttr(name, value)
      // Add attribute
      && addAttr(name,value)
    })
  } catch { throw new Error("attrs must an object") }

  // Loop on custom attributes
  try {
    entries(custom||{}).forEach(([name, value])=>{ !attrs[name] && addAttr(name,value) })
    entries(custom||{}).forEach(([name, value])=>{ checkCustom(attrs, name) && addAttr(name,value) })
  } catch { throw new Error("custom must an object") }

  // add children
  elem.append(...childHandler(data.children))

  after(elem, data)
  return elem

} 
const
  checkers = new Map, // list of specialised checking methods
  checker = checkers.get.bind(checkers), // shorcut to the "get" method of the Map "checkers"
  entries = Object.entries
;

console.log(document.body, document)
let addAttr = document.body.setAttribute, msg;


// Default checking methods for attributes without a specialised one
function defaultChecker(value) { return typeof value === 'string' }
// Check the common attribute
function checkAttr(attr, value) { return (checker(attr) || defaultChecker)(value) }
// Check if an attribute is duplicated
function checkCustom(o, key) { if((key in o)) throw msg = `duplicate attribute detected: ${key}` }


// Convert an object in HTMLElement
export default function ({ type:tag, attrs, custom, children }, childHandler){
  const
    // create HTMLElement
    elem = document.createElement(tag)
  ;
  
  addAttr = addAttr.bind(elem)

  try{
    // Loop on attributes
    msg = "attrs must an object"
    entries(attrs||{}).forEach(([name, value])=>{
      // check attribute
      checkAttr(name, value)
      // Add attribute
      && addAttr(name,value)
    })

    // Loop on custom attributes
    msg = "custom must an object"
    entries(custom||{}).forEach(([name, value])=>{ checkCustom(attrs, name) && addAttr(name,value) })
  } catch { err(msg) }

  // add children
  elem.append(...childHandler(children))

  return elem

} 
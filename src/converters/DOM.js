
const
  checkers = new Map, // list of specialised checking methods
  checker = checkers.get.bind(checkers) // shorcut to the "get" method of the Map "checkers"


// Default checking methods for attributes that doesnt have a specialised one
function defaultChecker(value) { return typeof value === 'string' }
// Check the attribute
function check(attr, value) { return (checker(attr) || defaultChecker)(value) }
// Convert an object in HTMLElement
export default function (data, childHandler, {before, after}){
  const
    { type:tag, attrs, custom } = before(data),
    // create HTMLElement
    elem = document.createElement(tag)
  
  // Loop on attributes
  try{
    Object.entries(attrs||{}).forEach(([key, val])=>{
      // check attribute
      !check(key, val)
      // Add attribute
      && elem.setAttribute(key,val)
    })
  } catch { throw new Error("attrs must an object") }

  // Loop on custom attributes
  try {
    Object.entries(custom||{}).forEach(([key, val])=>{ elem.setAttribute(key,val) })
  } catch { throw new Error("custom must an object") }
  // Object.entries(custom).forEach(([key, val])=>{ elem.setAttribute(`data-${key}`,val) })

  // add children
  elem.append(...childHandler(data.children))

  after(elem, data)
  return elem

} 
/** Templater_core - A JSX generator
 *
 * At the core of our philosophy lies the intent to reuse native code before resorting to custom solutions.
 * Otorp.js is a potent, lightweight, and versatile JavaScript library crafted to simplify and elevate your web development experience.
 * It offers a collection of aliases for native methods, fostering productivity by streamlining code across native JavaScript objects.
 * Designed for simplicity and ease of use, Otorp.js empowers developers to create cleaner, more concise code.
 * 
 * @authors
 * - DreamDevStudio
 * - Lanagramme
 * - TDJ.dev
 * @version O.0.0
 * @since September 5, 2023
 * @see [Templater_core GitHub Repository](https://github.com/DreamDevStudio/Templater_Core)
 * @year 2023
*/
// * @license MIT License
//  * @copyright Copyright (c) 2023 by TDJ.dev and TDN (TISSOT Development Network)

import converters from './converters/main.js'

console.log(converters)

function outputErr() { err('unknown output type') }
function templateErr() { err('template must be an object') }
function generatePostProcessor(fn) { return (res, source) => (fn(res, source), res) }

window.err = function (msg) { throw new Error(msg) }
window.Convertion = function Convertion(template, output, {before=x=>x, after=()=>{}}={}) {
  
  const
    converter = converters.get(output),
    post = generatePostProcessor(after)
  ;

  function handleChild(arr=[]) { return arr.map(x=>post(handleTemplate(before(x)), x)) }
  function handleTemplate(converter, template){
    if(typeof template !== 'object' || Array.isArray(template) ) templateErr()
    return converter(template, handleChild)
  }

  return handleTemplate(converter || outputErr, template)
}

export default Convertion
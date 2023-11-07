import {globSync} from "glob";

export function browseDir(path, fn, opt){ return readDir(path,opt).forEach(fn) }
export function reduceDir(path, fn, acc, opt){ return readDir(path,opt).reduce(fn,acc) }
// function readDir(path){ return readdirSync(path,{ withFileTypes: true }) }
function readDir(path, opt={}){ return globSync(path,{ withFileTypes: true, ...opt }) }
export default { browseDir, reduceDir }
function isObject(o){ return typeof o === "object" && !Array.isArray(o) }
export function hooks(arr){
  return {
    before(data){ return data && arr.push(!0), data },
    after(a,data){ a && isObject(data) && arr.push(!0) }
  }
}

export function childHandler(arr){ return function(c){ return arr.push(true),[] } }


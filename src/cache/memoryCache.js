var cache = {
  resetPasswordCache: {}
};

const get = (key) => { return cache[key]; }

const set = (key, val) => { cache[key] = val; }

const setSpecificCacheValue = (keys, value) => {
  let currentCache = cache
  for(let i=0; i<keys.length; i++){
    let key = keys[i]
    if(keys.length-1 === i){
      currentCache[key] = value
    }else if(!Object.keys(currentCache).includes(key)) {
      currentCache[key] = {}
    }
    currentCache = currentCache[key]
  }
}

const getSpecificCacheValue = (keys) => {
  let currentCache = cache
  for(let i=0; i<keys.length; i++){
    let key = keys[i]
    if(keys.length-1 === i){
      return currentCache[key]
    }else if(!Object.keys(currentCache).includes(key)) {
      return null
    }
    currentCache = currentCache[key]
  }
}

module.exports = {
  set,
  get,
  setSpecificCacheValue,
  getSpecificCacheValue
}
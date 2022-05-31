module.exports = function () {
    var cache = {
        resetPasswordCache: {}
    };
    return {
        get: function (key) { return cache[key]; },
        set: function (key, val) { cache[key] = val; },
        setSpecificCacheValue: function(keys, value){
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
        },
        getSpecificCacheValue: function(keys){
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
    }
}();
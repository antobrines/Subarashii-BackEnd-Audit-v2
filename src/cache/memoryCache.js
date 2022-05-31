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
                    console.log(1)
                    currentCache[key] = value
                    console.log(2)
                }else if(!Object.keys(currentCache).includes(key)) {
                    console.log(3)
                    currentCache[key] = {}
                    console.log(4)
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
                    return Error("Key " + key + " doesn't exist")
                }
                currentCache = currentCache[key]
            }
        }
    }
}();
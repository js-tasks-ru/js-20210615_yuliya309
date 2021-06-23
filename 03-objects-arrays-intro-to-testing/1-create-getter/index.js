/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    return function(object)
    {
        let arrayKey = path.split(".");
        let obj = object;
        for(let key of arrayKey)
        {
            if(key in obj)
            {
                if(typeof obj[key] === "object")    
                    obj = obj[key];
                else    
                    return obj[key];
            }
        }
        return obj[arrayKey[arrayKey.length - 1]];

    }
}

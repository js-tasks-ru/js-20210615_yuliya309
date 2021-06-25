/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {

    const arrayKey = path.split(".");

    return function(object)
    {
        let obj = object;
        for(let key of arrayKey)
        {
            if(key in obj)
            {
                    obj = obj[key];
            }
            else
                return;
        }
        return obj;

    }
}

/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    // Получим первый элемент.
    let oldArray = arr.slice(0);
    let newArray = oldArray.splice(0,1);

    for(let value of oldArray)
    {
        for(let i = 0; i < newArray.length; i++)
        {
            let compare = newArray[i].localeCompare(value,["ru", "en", ],{caseFirst:"upper"});
            if(param === "asc")
            {
                if(compare > 0)
                {
                    if(i === 0)
                    {
                        newArray.unshift(value);
                        break;
                    }
                    newArray.splice(i,0,value);
                    break;
                }
                if(compare <= 0)
                {
                    if( i === newArray.length - 1)
                    {
                        newArray.push(value);
                        break;
                    }
                    continue;
                }
            }
            if(param === "desc")
            {
                if(compare < 0)
                {
                    if(i === 0)
                    {
                        newArray.unshift(value);
                        break;
                    }
                    newArray.splice(i,0,value);
                    break;
                }
                if(compare >= 0)
                if( i === newArray.length - 1)
                {
                    newArray.push(value);
                    break;
                }
                continue;
            }
        }
    }
    return newArray;
}

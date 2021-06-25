/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    // Получим первый элемент.
    const newArray = [...arr];
    const dec = {
        asc: 1,
        desc: -1,
    }
    if(!(param in dec))
        return;

    return newArray.sort((value1, value2) => { 
        return dec[param] * value1.localeCompare(value2,["ru", "en", ],{caseFirst:"upper"}); 
    });
}

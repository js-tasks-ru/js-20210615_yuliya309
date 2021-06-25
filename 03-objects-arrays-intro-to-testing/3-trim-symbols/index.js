/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {

    if(size < 0 || size == 0)
        return "";

    let newString = "";

    for(let i = 0; i < string.length;)
    {
        let count = countChar(string.slice(i));
        if(count === undefined)
            return;
            
        if(count <= size)
        {
            // Сохраним допустимые символы.
            newString = newString + string.substr(i, count);
            // Продолжим перебор string с позиции - после сохраненных символов.
            i += count;
            continue;
        }

        // Сохраним допустимые символы - максимальное кол-во.
        newString = newString + string.substr(i, size);
        // Продолжим перебор string с позиции - после ряда одинаковых символов.
        i += count;
    }

    return newString;
}

function countChar(subStr)
{
    if(subStr === "")
        return;
    
    let charFirst = subStr[0];
    let count = 0;

    for(let char of subStr)
    {
        if(char !== charFirst){
            return count;
        }
        count++;
    }
    return count;
}





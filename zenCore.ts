

const numberDel = '$';
export interface Loop<T>{
    each: T[],
    do: (t: T) => any
}
export function zen(strings : any, ...values){
    const sArr = strings as string[];
    const sArrWithSiblings = [];
    for(let i = 0, ii = sArr.length; i < ii; i++){
        const word = sArr[i];
        const sArrElement = word + numberDel + i;
        if(sArrElement.substr(0, 1) === '+'){
            sArrWithSiblings[sArrWithSiblings.length - 1] += sArrElement;
        }else{
            sArrWithSiblings.push(sArrElement);
        }
    }
    const outputArr = [] as any[];
    let allTags = [];
    for(const tagSequence of sArrWithSiblings){
        const tags = tagSequence.split('>');
        allTags = allTags.concat(tags);
    }
    processTags(allTags, outputArr, values);
    return outputArr;
}

const camelToSnakeRegEx = /([A-Z])/g;
const toDashLowerCase = function($1){return "-"+$1.toLowerCase();}
function camelToSnake(str: string){
    return str.replace(camelToSnakeRegEx, toDashLowerCase);
}
const atSplitRegExp = /([^\\\][^@]|\\@)+/g;
const scSplitRegExp = /([^\\\][^:]|\\:)+/g;
const splitRegExps: {[key: string]: RegExp} = {};
function splitWithEscape(s: string, chr: string){
    let reg = splitRegExps[chr];
    if(!reg){
        const r = `([^\\\\\\][^${chr}]|\\\\${chr})+`;
        console.log(r);
        reg = new RegExp(r, 'g');
        debugger;
        splitRegExps[chr] = reg;
    }
    //debugger;
    return s.match(reg) || [''];
}
// function splitWithEscape(s: string, chr: string){
//     console.assert(chr.length === 1);
//     const retObj: string[] = [];
//     const buff = [];
//     let prevLetterIsEscape = false;
//     for(let i = 0, ii = s.length; i < ii; i++){
//         const letter = s.charAt(i);
//         switch(letter){
//             case chr:
//                 if(!prevLetterIsEscape){
//                     retObj.push(buff.join(''));
//                 }else{
//                     buff.push(letter);
//                     prevLetterIsEscape = false;
//                 }
//                 break;
//             case '\\':
//                 if(prevLetterIsEscape){
//                     buff.push('\\');
//                 }else{
//                      prevLetterIsEscape = true;
//                 }
               
//                 break;
//             default:
//                 if(prevLetterIsEscape){
//                     buff.push('\\');
//                 }
//         }
//         if(letter === chr && prevLetter !== '\\'){

//         }
        
//     }
// }
function processTag(tag: string, outputArr: any[], values, fnInside){
    if(tag.length === 0) return;
    const tagWNumber = tag.split(numberDel);
    const tagWONumber = tagWNumber[0];
    const tagWAttributes = tagWONumber.match(atSplitRegExp) || [''];
    const test = splitWithEscape(tagWONumber, '@');
    debugger;
    const tagWOAttributes = tagWAttributes[0]; 
    const tagWClasses = tagWOAttributes.split('.');
    const tagWOClasses = tagWClasses[0];
    //const tagWAttributes = tagWOClasses.split('@');
    
    
    const tagWID = tagWOClasses.split('#', 2);
    const tagWOIDAndNoDiv = tagWID[0];
    const idx = (tagWNumber.length > 1) ? parseInt(tagWNumber[1]) : -1;
    const val = idx > -1 ? values[idx] : undefined;
    if(tagWOIDAndNoDiv.length === 0){
        if(tagWID.length === 1 && tagWClasses.length === 1 && tagWAttributes.length === 1){
          if(typeof val === 'undefined') return;
        }
    }
    const tagWOID = tagWOIDAndNoDiv || 'div';
    outputArr.push('<' + tagWOID);
    if(tagWID.length > 1){
        outputArr.push(` id="${tagWID[1]}"`);
    }
    
    if(tagWAttributes.length > 1){
        const attribs = tagWAttributes.slice(1).map(s=> {
            const lhsRhs = s.match(scSplitRegExp);
            const key = camelToSnake(lhsRhs[0]);
            return lhsRhs.length === 1 ? key : `${key}="${lhsRhs[1]}"`;
        }).join(' ');
        outputArr.push(` ${attribs}`);
    }
    if(tagWClasses.length > 1){
        outputArr.push(` class="${tagWClasses.slice(1).join(' ')}"`)
    }
    if(typeof val !== 'undefined'){
        switch(typeof val){
            case 'string':
                outputArr.push('>');
                outputArr.push(val);
                break;
            case 'object':
                let props = val;
                let content = null;
                if(Array.isArray(val)){
                    props = val[1];
                    content = val[0];
                }
                for(const key in props){
                    const atV = props[key];
                    switch(typeof atV){
                        case 'boolean':
                            if(atV){
                                outputArr.push(` ${camelToSnake(key)}`);
                            }
                            break;
                        default:
                            outputArr.push(` ${camelToSnake(key)}="${atV}"`);
                    }
                    
                }
                outputArr.push('>');
                if(content){
                    outputArr.push(content);
                }
                break;
            
        }
    }else{
        outputArr.push('>');
    }
    if(fnInside) fnInside();
    outputArr.push('</' + tagWOID + '>');
}
function processTags(tags: string[], outputArr: any[], values){
    if(tags.length === 0) return;
    let surroundingTag = tags.shift();
    if(surroundingTag.indexOf('+') > -1){
        const siblingTags = surroundingTag.split('+');
        for(const tag of siblingTags){
            processTag(tag, outputArr, values, null);
        }
    }else{
        const innerFun = () => processTags(tags, outputArr, values);
        processTag(surroundingTag, outputArr, values, innerFun)
    }
}

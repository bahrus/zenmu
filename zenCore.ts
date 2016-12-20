

const numberDel = '$';
export function zen(strings : any, ...values){
    const sArr = strings as string[];
    const sArrWithSiblings = [];
    for(let i = 0, ii = sArr.length; i < ii; i++){
        const word = sArr[i];
        if(!word) continue;
        const sArrElement = word + numberDel + i;
        if(sArrElement.substr(0, 1) === '+'){
            sArrWithSiblings[sArrWithSiblings.length - 1] += sArrElement;
        }else{
            sArrWithSiblings.push(sArrElement);
        }
    }
    console.log(sArrWithSiblings);
    const outputArr = [] as any[];
    const tagBuffer = [] as string[];
    for(const tagSequence of sArrWithSiblings){
        const tags = tagSequence.split('>');
        console.log(tags);
        processTags(tags, outputArr, values);
    }
    return outputArr;
}

const camelToSnakeRegEx = /([A-Z])/g;
const toDashLowerCase = function($1){return "-"+$1.toLowerCase();}
function camelToSnake(str: string){
    return str.replace(camelToSnakeRegEx, toDashLowerCase);
}
function processTag(tag: string, outputArr: any[], values, fnInside){
    const tagWNumber = tag.split(numberDel);
    const tagWONumber = tagWNumber[0];
    const tagWClasses = tagWONumber.split('.');
    const tagWOClasses = tagWClasses[0];
    
    const tagWID = tagWOClasses.split('#');
    const tagWOID = tagWID[0];
    outputArr.push('<' + tagWOID);
    
    if(tagWID.length > 1){
        outputArr.push(` id="${tagWID[1]}"`);
    }
    if(tagWClasses.length > 1){
        outputArr.push(` class="${tagWClasses.slice(1).join(' ')}"`)
    }
    if(tagWNumber.length > 1){
        const idx = parseInt(tagWNumber[1]);
        const val = values[idx]
        switch(typeof val){
            case 'string':
                outputArr.push('>');
                outputArr.push(val);
                break;
            case 'object':
                for(const key in val){
                    switch(typeof val){
                        case 'boolean':
                            outputArr.push(` ${camelToSnake(key)}`);
                            break;
                        default:
                            outputArr.push(` ${camelToSnake(key)}="${val[key]}"`);
                    }
                    
                }
                outputArr.push('>');
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
        //outputArr.push(`<${surroundingTag}>`);
        //processTags(tags, outputArr, values);
        // if(!zenContext.closedFirstTag){
        //     if(zenContext.idx < values.length){
        //         outputArr.push(values[zenContext.idx]);
        //         zenContext.idx++;
        //     }
        //     zenContext.closedFirstTag = true;
        // }
        //outputArr.push(`</${surroundingTag}>`);
    }
   
}

function processSiblings(){

}
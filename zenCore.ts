
interface ZenContext{
    // idx: number,
    // closedFirstTag: boolean,
    // openTag: string,
}

const numberDel = '###';
export function zen(strings : any, ...values){
    const sArr = strings as string[];
    const sArrWithSiblings = [];
    for(let i = 0, ii = sArr.length; i < ii; i++){
        const word = sArr[i];
        if(!word) continue;
        const sArrElement = word + '###' + i;
        if(sArrElement.substr(0, 1) === '+'){
            sArrWithSiblings[sArrWithSiblings.length - 1] += sArrElement;
        }else{
            sArrWithSiblings.push(sArrElement);
        }
    }
    console.log(sArrWithSiblings);
    const outputArr = [] as any[];
    const tagBuffer = [] as string[];
    const zenContext = {
        // closedFirstTag: false,
        // idx: 0,
        // openTag: null,
    } as ZenContext;
    for(const tagSequence of sArrWithSiblings){
        const tags = tagSequence.split('>');
        console.log(tags);
        //zenContext.closedFirstTag = false;
        processTags(tags, outputArr, values, zenContext);
    }
    return outputArr;
}

function processTags(tags: string[], outputArr: any[], values, zenContext: ZenContext){
    if(tags.length === 0) return;
    let surroundingTag = tags.shift();
    if(surroundingTag.indexOf('+') > -1){
        const siblingTags = surroundingTag.split('+');
        for(const tag of siblingTags){
            const tagWNumber = tag.split(numberDel);
            outputArr.push('<' + tagWNumber[0] + '>');
            if(tagWNumber.length > 0){
                const idx = parseInt(tagWNumber[1]);
                outputArr.push(values[idx]);
            }
            outputArr.push('</' + tagWNumber[0] + '>');
        }
    }else{
        outputArr.push(`<${surroundingTag}>`);
        processTags(tags, outputArr, values, zenContext);
        // if(!zenContext.closedFirstTag){
        //     if(zenContext.idx < values.length){
        //         outputArr.push(values[zenContext.idx]);
        //         zenContext.idx++;
        //     }
        //     zenContext.closedFirstTag = true;
        // }
        outputArr.push(`</${surroundingTag}>`);
    }
   
}

function processSiblings(){

}
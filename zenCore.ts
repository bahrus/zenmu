
interface ZenContext{
    idx: number,
    closedFirstTag: boolean,
    openTag: string,
}
export function zen(strings : any, ...values){
    const sArr = strings as string[];
    const sArrWithSiblings = [];
    for(let i = 0, ii = sArr.length; i < ii; i++){
        const sArrElement = sArr[i];
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
        closedFirstTag: false,
        idx: 0,
        openTag: null,
    } as ZenContext;
    for(const tagSequence of sArrWithSiblings){
        const tags = tagSequence.split('>');
        console.log(tags);
        zenContext.closedFirstTag = false;
        processTags(tags, outputArr, values, zenContext);
    }
    return outputArr;
}

function processTags(tags: string[], outputArr: any[], values, zenContext: ZenContext){
    if(tags.length === 0) return;
    let surroundingTag = tags.shift();
    if(surroundingTag.indexOf('+') > -1){

    }else{
         outputArr.push(`<${surroundingTag}>`);
        processTags(tags, outputArr, values, zenContext);
        if(!zenContext.closedFirstTag){
            if(zenContext.idx < values.length){
                outputArr.push(values[zenContext.idx]);
                zenContext.idx++;
            }
            zenContext.closedFirstTag = true;
        }
        outputArr.push(`</${surroundingTag}>`);
    }
   
}

function processSiblings(){

}
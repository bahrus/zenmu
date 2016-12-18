
interface ZenContext{
    idx: number,
    closedFirstTag: boolean,
}
export function zen(strings : any, ...values){
    const sArr = strings as string[];
    const outputArr = [] as any[];
    const tagBuffer = [] as string[];
    const zenContext = {
        closedFirstTag: false,
        idx: 0
    } as ZenContext;
    for(const tagSequence of sArr){
        const tags = tagSequence.split('>');
        zenContext.closedFirstTag = false;
        processTags(tags, outputArr, values, zenContext);
    }
    return outputArr;
}

function processTags(tags: string[], outputArr: any[], values, zenContext: ZenContext){
    if(tags.length === 0) return;
    const firstTag = tags.shift();
    outputArr.push(`<${firstTag}>`);
    processTags(tags, outputArr, values, zenContext);
    if(!zenContext.closedFirstTag){
        if(zenContext.idx < values.length){
            outputArr.push(values[zenContext.idx]);
            zenContext.idx++;
        }
        zenContext.closedFirstTag = true;
    }
    outputArr.push(`</${firstTag}>`);
}
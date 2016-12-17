
export function zen(strings : any, ...values){
    const sArr = strings as string[];
    const outputArr : string[] = [];
    const tagBuffer: string[] = [];
    for(const tagSequence of sArr){
        const tags = tagSequence.split('>');
        processTags(tags, outputArr);
        
    }
    return outputArr;
}

function processTags(tags: string[], outputArr: string[]){
    if(tags.length === 0) return;
    const firstTag = tags.shift();
    outputArr.push(`<${firstTag}>`);
    processTags(tags, outputArr);
    outputArr.push(`</${firstTag}>`);
}
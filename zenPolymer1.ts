const xyR = /[xy]/g;
function guid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(xyR, c => {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });

}
function populateGUIds(obj){
    const names = Object.getOwnPropertyNames(obj);
    for(const name of names){
        obj[name].uid = guid();
    }
}
function replaceGUIDsWithPolymerSelector(s: string, obj){
    const names = Object.getOwnPropertyNames(obj);
    let returnS = s;
    for(const name of names){
        returnS = returnS.replace(obj[name].uid, `{{${name}}}`);
    }
    return returnS;
}
export function zenToPolymer1(zen: any[], obj){
    populateGUIds(obj);
    for(let i = 0, ii = zen.length; i < ii; i++){
        const word = zen[i];
        switch(typeof word){
            case 'function':
                const evalledFunction = word(obj);
                const polymerExpr = replaceGUIDsWithPolymerSelector(evalledFunction, obj);
                zen[i] = polymerExpr;
                break;
        }
    }
}
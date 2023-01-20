let name = 'ilay';
let surename = 'kuCevAlov';

let upN = name[0].toUpperCase();
let upS = surename[0].toUpperCase();


let lowN = name.substr(1).toLowerCase();
let lowS = surename.substr(1).toLowerCase();

let transformName = upN + lowN;
let transformSurename =upS + lowS;

console.log(transformName + ' ' + transformSurename)

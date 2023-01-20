'use strict'
let n = -3;
let m = -10;

let u = Math.max(n , m)
let d = Math.min(n , m)

let pN = Math.round(Math.random() * (u - d) + d)

if(pN % 2 != 0 && pN >= d){
    console.log(pN)
}


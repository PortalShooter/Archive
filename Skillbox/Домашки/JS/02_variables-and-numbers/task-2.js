'use strict'
let a = 13.890123
let b = 2.8910564
let n = 3

let aN = a - Math.floor(a)
let bN = b - Math.floor(b)

let aLast = Math.floor(aN * Math.pow(10, n))
let bLast = Math.floor(bN * Math.pow(10, n))

console.log(aLast)
console.log(bLast)

if (aLast === bLast){
    console.log(aLast + ' === ' + bLast)
} else if (aLast > bLast){
    console.log(aLast + ' > ' + bLast)
} else if (aLast < bLast){
    console.log(aLast + ' < ' + bLast)
} else if (aLast >= bLast){
    console.log(aLast + ' >= ' + bLast)
} else if (aLast <= bLast){
    console.log(aLast + ' <= ' + bLast)
}
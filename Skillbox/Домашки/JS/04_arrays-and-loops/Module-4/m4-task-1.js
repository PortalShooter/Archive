'use strict'
let n = -3;
let m = -10;
let count = 40;



let min = Math.min(n, m)
let max = Math.max(n, m)

let a

for(let i = 0; i <= count; i++){
	let r = [Math.floor(Math.random() * (max - min) + min)];
	for(a of r){
		console.log(a)
	}
}


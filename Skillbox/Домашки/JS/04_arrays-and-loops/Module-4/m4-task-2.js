'use strict'
let text = 'Привет мир!'
let n = text.length - 1;
let round = ''

for(n ; n >= 0 ; n--){
	let p = text[n]
	round += p
}
console.log(round)

'use strict'
let dates = []
let dayOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
for(let n = 1; n <= 31; n++){
	dates.push(n)
}

let n = 1

step: for(let date of dates){
	for(;n < 31 ;){
		n += 1

		console.log(`${date} января, ${dayOfWeek[n - 1]}`)
		if(n == 7){
			n = 0
		}
		continue step;
	}
}




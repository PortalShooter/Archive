'use strict'
let roadMines = [true, false, false, false, false, false, false, false, false, true]

let position;
let n = 0;
step: for(position in roadMines){
	console.log(`Танк переместился на ${+position + 1}`);

	if(roadMines[position] === false && n <= 1){
		n += 1;
		console.log('Танк поврежден');
		continue step;
	} else if(roadMines[position] === false && n ===2){
		console.log('Танк уничтожен');
		break step;
	}
}


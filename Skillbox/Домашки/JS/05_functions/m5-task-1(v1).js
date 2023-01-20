'use strict'
let allList = ['sema', 'nastay2001', 'petay1985', 'artem228'];
let blackList = ['nastay2001', 'artem228'];

function whiteList() {
	let skip = [];
	block: for (let check of allList) {
		for (let blackName of blackList) {
			if (check == blackName) {
				continue block;
			}
		}
		skip.push(check)
	}
	return (console.log(skip))
}
whiteList()
export default { whiteList() }

'use strict'
let allList = ['sema', 'nastay2001', 'petay1985', 'artem228'];
let blackList = ['nastay2001', 'artem228'];

function whiteList() {
	let skip = [];
	block: for (let check of allList) {
		if (!blackList.includes(check)) {
			skip.push(check)
		}
		else continue block;
	}
	return (console.log(skip))
}
whiteList()
export default { whiteList() }

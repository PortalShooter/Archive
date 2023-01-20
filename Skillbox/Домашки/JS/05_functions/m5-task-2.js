'use strict'
let valueBasket = prompt('Общая сумма корзины');
let numberProducts = prompt('Количество товаров');
let promo = prompt('Промокод');

let totalCost = valueBasket;

function discount() {
	if (promo == 'ДАРИМ300') {
		totalCost = valueBasket - 300;
		if (totalCost < 0) {
			totalCost = 0;
		}
	}
	if (numberProducts >= 10) {
		totalCost *= 0.95;
	}
	if (totalCost > 50000) {
		let difference = totalCost - 50000;
		totalCost -= difference * 0.8;
	}
	if (promo == 'СКИДКА15' || totalCost >= 20000) {
		totalCost *= 0.85;
	}

}
discount()
console.log(totalCost)

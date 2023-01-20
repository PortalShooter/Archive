'use strict'
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function createBoard() {
  const board =  document.createElement('div');
  board.classList.add('board')
  document.body.append(board)
  for(let i = 0; i < row; i++) {
    const row = document.createElement('div')
    row.classList.add('row')
    board.append(row)
  }

  return board
}
function createCard(name, board, cache, time) {
  const card = document.createElement('button');
  card.classList.add('card');

  const cardContent = document.createElement('div')
  cardContent.textContent = name;
  cardContent.classList.add('cardContent');

  card.append(cardContent)
  board.append(card)

  card.addEventListener('click', () => {
    cardContent.classList.add('is-open')
    cache(card, time)
  })

}
function steamCheck() {
  let arr = [];
  let n = 0;
  return function(card, time) {
    arr.push(card)
    arr[0].setAttribute('disabled', 'disabled')
    arr[1].setAttribute('disabled', 'disabled')
    if(arr.length == 2 && arr[0].firstChild.textContent == arr[1].firstChild.textContent) {
      arr[0].classList.add('card-active')
      arr[1].classList.add('card-active')
      arr = []
      n += 2;
    }
    if(arr.length == 3) {
      arr[0].removeAttribute('disabled', 'disabled')
      arr[1].removeAttribute('disabled', 'disabled')
      arr[0].firstChild.classList.remove('is-open')
      arr[1].firstChild.classList.remove('is-open')
      arr.shift()
      arr.shift()
    }
    if(n == sum){
      clearInterval(time)
      alert('Поздравляю, вы выиграли');
    }
  }
}

const row = +prompt('Введите число строк от 0 до 10', 4);
const column = +prompt('Введите число столбцов от 0 до 10', 4);

let cards = [];
let sum = row * column;

for(let i = 0; i < sum/2; i++) {
  cards.push(i)
  cards.push(i)
}
let timer = document.createElement('div')
timer.classList.add('timer')
document.body.append(timer)

const button = document.createElement('button');
button.textContent = 'Начать игру'
document.body.append(button)
button.addEventListener('click', () => {
  if(document.querySelector('.board')) {document.querySelector('.board').remove()}
  const board = createBoard()

  shuffle(cards)

  timer.textContent = 30;
  let time = setInterval(() => {
    timer.textContent--
    if(timer.textContent == 0) {
      clearInterval(time)
      const cards = document.querySelectorAll('.card')
      for(let i in cards) {
        cards[i].setAttribute('disabled', 'disabled')
        cards[i].classList.add('lose')
      }
    }
  }, 1000);

  let cache = steamCheck(time)

  const rows = document.querySelectorAll('.row')
  let rowNumber = 0;
  let n = column
  for(let i in cards) {
    addCardsInRow()
    function addCardsInRow() {
      if(i < n){
        createCard(cards[i], rows[rowNumber], cache, time)
      } else {
        rowNumber++
        n += column
        return addCardsInRow()
      }
    }
  }
  button.textContent = 'Сыграть ещё раз'
})





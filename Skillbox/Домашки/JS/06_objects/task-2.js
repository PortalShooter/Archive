'use strict'
let array = [
  { value: 0, label: "Первый элемент"},
  { value: 1, label: "Второй элемент"},
  { value: 2, label: "Третий элемент"}
  ];

function makeList(arr){

  let select = document.createElement('select');
  arr.forEach(element => {
    let opt = document.createElement('option');
    opt.value = element.value
    opt.text = element.label

    select.appendChild(opt)
  });
  return select;
}


let container = document.querySelector('.container');
container.append(makeList(array));

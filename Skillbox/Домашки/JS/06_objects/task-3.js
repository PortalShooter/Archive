'use strict'

let arr1 = [
  24,
  3,
  'JJJJ',
  { value: 0, label: "Первый элемент"},
  { value: 1, label: "Второй элемент"},
  { value: 2, label: "Третий элемент"}]

let arr2 = {
  value1: "Первое значение",
  value2: "Второе значение",
  value3: "Третье значение",
}

function makeList(arr, id ){
  let select = document.createElement('select');
  let a = 0
  check(arr)
  function check(arr){
    if(Array.isArray(arr)){
      arr.forEach((element, index) => {
        if(typeof element  === 'object'){
          select.appendChild(opt(element.label, element.value, index, id))
        } else select.appendChild(opt(element, element, index, id))
      })
    }
    else if(typeof arr === 'object'){
      for(let value in arr){
        let text = arr[value]
        select.appendChild(opt(text, value, a, id))
        a++
      }
    } else select.appendChild(opt(arr))

  }

  return select;
}

let container = document.querySelector('.container');
container.append(makeList(arr1, 2))
container.append(makeList(arr2, 1))

function opt(text, value, i, id = 0) {
  let opt = document.createElement('option')
  opt.value = value;
  opt.textContent = text;
  if( i === id) {
    opt.selected = true
  }
  return opt
}


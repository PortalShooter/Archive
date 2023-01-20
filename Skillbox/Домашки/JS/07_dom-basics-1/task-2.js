'use strict'
let input = document.createElement('input');
let h2 = document.createElement('h2');
let task2 = document.querySelector('.task-2')
let timeId
task2.append(input)
task2.append(h2)

input.onkeydown = textOutput

function textOutput() {
  clearTimeout(timeId)
  console.log(timeId)
  timeId = setTimeout(addContent, 300)
  function addContent() {
    h2.textContent = input.value;
  }
}


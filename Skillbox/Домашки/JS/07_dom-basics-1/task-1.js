'use strict'
let int
function oneClick() {
    let time = document.querySelector('.inputNumber')
    let timer = document.querySelector('.timer')

    clearInterval(int)
    timer.textContent = time.value
    int = setInterval(tim, 1000)

    function tim(){
        if(timer.textContent != 0){
            timer.textContent -= 1;
            console.log(timer)
        } else clearInterval(int)
    }
}
let btn = document.querySelector('.btn')
btn.addEventListener('click', oneClick)

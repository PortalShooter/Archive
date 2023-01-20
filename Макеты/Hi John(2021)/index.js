'use strict'
let burgerBtn = document.querySelector('.burger')
let menu = document.querySelector('.header__menu')
if(burgerBtn){
    burgerBtn.addEventListener('click', function() {
        document.body.classList.toggle('_lock')
        burgerBtn.classList.toggle('_active')
        menu.classList.toggle('_active')
    })
}
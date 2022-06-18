'use strict'
// Свайпер
var mySwiper = new Swiper('.swiper-container', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
// Бургер
let burger = document.querySelector('.burger')
let menu = document.querySelector('.header-nav')
burger.addEventListener('click', function() {
  burger.classList.toggle('_active')
  menu.classList.toggle('_active')
  document.body.classList.toggle('lock')
})
// tabs
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.work-btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path
      console.log(path)

      document.querySelectorAll('.tab-content').forEach(function(tabContent) {
        tabContent.classList.remove('tab-content-active')
      })
      document.querySelector(`[data-target="${path}"`).classList.add('tab-content-active')
    })
  })
})
// Аккордеон
$( function() {
$( "#accordion" ).accordion({
  heightStyle: "content",
});
});

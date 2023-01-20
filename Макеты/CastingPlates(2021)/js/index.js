'use strict'
// Кнопка меню
document.querySelector('.header__btn').addEventListener('click', () => {
  document.querySelector('.header__menu').classList.add('_active')
  document.querySelector('.menu__circle').classList.add('_active')
  document.querySelector('.menu__circle-orange').classList.add('_active')


})
document.querySelector('.menu__close').addEventListener('click', () => {
  document.querySelector('.menu__circle-orange').classList.remove('_active')
  setTimeout(() => {
    document.querySelector('.header__menu').classList.remove('_active')
  }, 1010)

  setTimeout(() => {
    document.querySelector('.menu__circle').classList.remove('_active')
  }, 1000)

})
// Аккордеон в FAQ
$(document).ready(function() {
  $('.accordion-item__trigger').click(function(){
    $(this).next('.accordion-item__content').slideToggle();
  })
});
// Онлайн расчет
const form1 = document.querySelector('.form-table')
const form2 = document.querySelector('.form-adress')
const form3 = document.querySelector('.form-contacts')
const forms = [form1,form2,form3];
let formIndex = 0
const headerForm = document.querySelectorAll('.header-form__item')

if(form1) {
  form1.classList.add('form_active')
}
const formBtns = document.querySelectorAll('.form__btn')

formBtns.forEach(el => {
  el.addEventListener('click', () => {
    if(el.textContent === 'Далее' && formIndex < 3) {
      headerForm[formIndex].classList.remove('header-form__item_active')
      forms[formIndex].classList.remove('form_active')
      formIndex += 1
      forms[formIndex].classList.add('form_active')
      headerForm[formIndex].classList.add('header-form__item_active')
      headerForm[formIndex].classList.add('header-form__item_color')
    }
    if(el.textContent === 'Вернуться назад' && formIndex > 0) {
      headerForm[formIndex].classList.remove('header-form__item_color')
      headerForm[formIndex].classList.remove('header-form__item_active')
      forms[formIndex].classList.remove('form_active')
      formIndex -= 1
      forms[formIndex].classList.add('form_active')
      headerForm[formIndex].classList.add('header-form__item_active')
    }
  })
})
// Табы
var tabNavs = document.querySelectorAll(".catalog-page__tab");
var tabPanes = document.querySelectorAll(".tab-pane");

for (var i = 0; i < tabNavs.length; i++) {

  tabNavs[i].addEventListener("click", function(e){
    e.preventDefault();
    var activeTabAttr = e.target.getAttribute("data-tab");

    for (var j = 0; j < tabNavs.length; j++) {
      var contentAttr = tabPanes[j].getAttribute("data-tab-content");

      if (activeTabAttr === contentAttr) {
        tabNavs[j].classList.add("active");
        tabPanes[j].classList.add("active");
      } else {
        tabNavs[j].classList.remove("active");
        tabPanes[j].classList.remove("active");
      }
    };
  });
}

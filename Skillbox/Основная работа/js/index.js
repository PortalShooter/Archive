'use strict'
// Header btn
let btn = document.querySelectorAll('.second__btn')
  btn.forEach(el => {
    el.addEventListener('click', myFunction)
    let active = document.getElementById(el.name)
    function myFunction() {
      if(el.matches('.second__btn_active')){
        el.classList.remove('second__btn_active')
        active.classList.remove("scroll-active")
      } else{
        btn.forEach(el1 => {
          let active = document.getElementById(el1.name)
          el1.classList.remove('second__btn_active')
          active.classList.remove("scroll-active")
        })
        el.classList.toggle("second__btn_active")
        active.classList.toggle("scroll-active")
      }
      window.onclick = function(event) {
        if (!event.target.matches('.second__btn')) {
          var dropdowns = document.getElementsByClassName("customScroll");
          for (let i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('scroll-active')) {
              openDropdown.classList.remove('scroll-active');
              el.classList.remove('second__btn_active');
            }
          }
        }
      }
    }
  })
// burger
let burgerBtn = document.querySelector('.burger')
let menu = document.querySelector('.menu__list')
let enter = document.querySelector('.header__enter')
if(burgerBtn){
    burgerBtn.addEventListener('click', function() {
        document.body.classList.toggle('_lock')
        burgerBtn.classList.toggle('_active')
        menu.classList.toggle('_active')
        enter.classList.toggle('_active')
    })
}
// Скролл
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if(menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top;

      if(burgerBtn.classList.contains('_active')) {
        document.body.classList.remove('_lock')
        burgerBtn.classList.remove('_active')
        menu.classList.remove('_active')
        enter.classList.remove('_active')
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth'
      })
      e.preventDefault();
    }
  }
}
//Текст в галерее
let gallery = document.querySelector('.gallery__content')
let galleryText = document.querySelector('.gallery__desc')
let galleryFilter = document.querySelector('.gallery__filter')
function galleryAdaptive() {
  if(window.innerWidth <= 768) {
    gallery.insertAdjacentElement('beforeend', galleryText)
  }
  if(window.innerWidth > 768) {
    galleryFilter.insertAdjacentElement('beforeend', galleryText)
  }
}
galleryAdaptive()
// Accordion
$( function() {
$( "#accordion" ).accordion({
  heightStyle: "content",
});
});
// Кнопка "Все события"
let events = document.querySelector('.events__cards')
let eventsBtn = document.querySelector('.event__btn')
eventsBtn.addEventListener('click', function () {
  events.classList.toggle('open')
})

// Map
ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [55.7570333262053,37.61064017142446],
        zoom: 16
    });
    var myPlacemark = new ymaps.Placemark([55.7570333262053,37.61064017142446], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/contacts/map-marker.svg',
      iconImageSize: [28, 40],
      iconImageOffset: [-14, -40]
  });
myMap.geoObjects.add(myPlacemark);
}
// Карта на 320
let map = document.querySelector('#map')
let oldMap = document.querySelector('.contacts__flex')
let newMap = document.querySelector('.connect__call')
function map320() {
  if(window.innerWidth <= 320) {
    newMap.insertAdjacentElement('beforebegin', map)
  }
  else {
    oldMap.insertAdjacentElement('beforeend', map)
  }
}
map320()

// Select
  const element = document.querySelector('.gallery__select');
  const choices = new Choices(element,{searchEnabled: false,itemSelectText: '',shouldSort: false});

// Кнопка "Категории" (в блоке "издания")
let categories = document.querySelector('.checkbox__title')
let checkboxList = document.querySelector('.checkbox__list')
let checkboxLabel = document.querySelectorAll('.checkbox__label')
checkboxLabel.forEach(el => {
  el.addEventListener('click', function() {
    if(el.parentElement.classList.contains('checked')) {
      checkboxList.insertAdjacentElement('afterbegin', el.parentElement)
    }
    else {
      checkboxList.insertAdjacentElement('beforebegin', el.parentElement)
    }
    el.parentElement.classList.toggle('checked')
  })
})
categories.addEventListener('click', function() {
  categories.classList.toggle('is-open')
  checkboxList.classList.toggle('is-open')
})
if(window.innerWidth <= 320 && categories.hasAttribute('disabled')) {
  categories.removeAttribute('disabled')
}
window.addEventListener('resize', () => {
  if(window.innerWidth <= 320 && categories.hasAttribute('disabled')) {
    categories.removeAttribute('disabled')
  }
  if(window.innerWidth > 320 && !categories.hasAttribute('disabled')) {
    categories.setAttribute('disabled')
  }
})

// Поиск на 1024 и меньше
let searchForm = document.querySelector('.header__search')
let firsHeader = document.querySelector('.first')
let btnOpen = document.querySelector('.search__btn-open')
let btnClose = document.querySelector('.btn__close')
let logo = document.querySelector('.logo')
let secondHeader = document.querySelector('.second')
let searchPlaceholder = document.querySelector('.search__input')

btnOpen.addEventListener('click', function() {
  btnOpen.classList.add('is-open')
  searchForm.classList.add('is-open')
  firsHeader.insertAdjacentElement('beforeend', searchForm)

  if(window.innerWidth <= 768) {

    burgerBtn.classList.add('close')
    logo.classList.add('close')
    btnClose.classList.add('_active')
    searchPlaceholder.removeAttribute('placeholder')

    if(window.innerWidth <= 320) {
      firsHeader.classList.add('is-open')
    }
  }

  btnClose.addEventListener('click', function() {
    burgerBtn.classList.remove('close')
    logo.classList.remove('close')
    btnClose.classList.remove('_active')
    btnOpen.classList.remove('is-open')
    searchForm.classList.remove('is-open')
    secondHeader.insertAdjacentElement('beforeend', searchForm)
    firsHeader.classList.remove('is-open')
  })
})
window.addEventListener('resize', () => {
  map320();
  galleryAdaptive();
})

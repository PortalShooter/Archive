'use strict'
const pageSlider = new Swiper('.page', {
  wrapperClass: 'page__wrapper',
  slideClass: 'page__screen',
  direction: 'vertical',
  sliderPerview: 'auto',

// Управление клавиатурой
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
// Управление колесом мыши
  mousewheel: {
    sensitivity: 1,
  },

  wathOverflow: true,
  speed: 600,
  simulateTouch: false,

  observer: true,
  observerParents: true,
  observerSliderChildren: true,

  breakpoints: {
    375: {
      // freeMode = true,
      // simulateTouch: true,
    },
  }
})



const  heroSlider = new Swiper('.hero__container', {
  speed: 600,
  simulateTouch: false,
  navigation: {
    nextEl: '.hero__button-next',
    prevEl: '.hero__button-prev',
  },
  on: {
    activeIndexChange: function() {
      heroBtnPrevColor.style.fill = heroBtnColor[heroSlider.realIndex]
    }
  }
});

const advantagesSlider = new Swiper('.advantages__container', {
  speed: 600,
  simulateTouch: false,
  navigation: {
    nextEl: '.advantages__button-next',
    prevEl: '.advantages__button-prev',
  },
});

const adressSlider = new Swiper('.adress__container', {
  speed: 600,
  simulateTouch: false,
  navigation: {
    nextEl: '.adress__button-next',
    prevEl: '.adress__button-prev',
  },
});

// Кнопка в слайдере hero=========================
const heroBtnPrev = document.querySelector('.hero__button-prev')
const heroBtnNext = document.querySelector('.hero__button-next')
const heroBtnPrevColor = document.querySelector('.btn-prev_color')

const heroBtnColor = ['#5F282B','#5D745C','#802B2B','#677F9C']

// ==========================================

function freeMode() {
  if(document.documentElement.clientWidth <= 375) {
    pageSlider.params.freeMode = true
  }
  else pageSlider.params.freeMode = false
}
freeMode()
window.addEventListener('resize', freeMode)

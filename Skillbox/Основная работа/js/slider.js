// Swiper hero
const swiper = new Swiper('.swiper-container', {
    loop: true,
    simulateTouch: false,
    speed: 3000,
    autoplay: {
     delay: 8000,
   },
  },
  );

  const swiperBtn = new Swiper('.swiper-container__btn', {
    speed: 1000,
    spaceBetween: 34,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerColumn: 1,
    simulateTouch: false,
    pagination: {
      el: '.swiper-pagination-1',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next-1',
      prevEl: '.swiper-button-prev-1',
    },
    breakpoints: {
      1025: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerColumn: 2,
        slidesPerGroup: 3,
      },
      321: {
        spaceBetween: 34,
        slidesPerView: 2,
        slidesPerColumn: 2,
        slidesPerGroup: 3,
      }
    }
  },
  );

  const sliderEvents = document.querySelector('.events__swiper-container')
  let swiperEvents
  function mobileSlider() {
    if (window.innerWidth <= 320) {
      swiperEvents = new Swiper(sliderEvents, {
        speed: 1000,
        slidesPerView: 1,
        simulateTouch: true,
        slideClass : 'card-events',
        pagination: {
          el: '.swiper-pagination__events',
          type: 'bullets',
          clickable: false,
        },
      })
    }
    if (window.innerWidth > 320 && sliderEvents.classList.contains('swiper-container-initialized')) {
      swiperEvents.destroy()
    }
  }
  mobileSlider()

  const sliderEditions = document.querySelector('.swiper-container__editions')
  let swiperEditions
  function mobileSliderEditions() {
    if(window.innerWidth > 320) {
      swiperEditions = new Swiper(sliderEditions, {
        speed: 1000,
        spaceBetween: 30,
        slidesPerView: 3,
        slidesPerGroup: 3,
        simulateTouch: false,
        pagination: {
          el: '.swiper-pagination-1',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.swiper-button-next-1',
          prevEl: '.swiper-button-prev-1',
        },
        breakpoints: {
          1025: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          789: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          321: {
            spaceBetween: 34,
            slidesPerView: 2,
          }
        }
      },
      );
    }
    if (window.innerWidth <= 320 && sliderEditions.classList.contains('swiper-container-initialized')) {
      sliderEditions.destroy()
    }
  }
  mobileSliderEditions()

  const swiperProjects = new Swiper('.swiper-container__projects', {
    speed: 1000,
    spaceBetween: 34,
    slidesPerView: 1,
    slidesPerGroup: 1,
    simulateTouch: false,
    navigation: {
      nextEl: '.swiper-button-next-1',
      prevEl: '.swiper-button-prev-1',
    },
    breakpoints: {
      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
      321: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      }
    }
  },
  );

  window.addEventListener('resize', () => {
    mobileSlider();
    mobileSliderEditions();
  })
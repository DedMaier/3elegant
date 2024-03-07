// arrivals - подключение свайпера

import { auto } from '@popperjs/core';
import Swiper, { Navigation, Pagination, Scrollbar, Parallax, Keyboard } from 'swiper';
Swiper.use([Navigation, Pagination, Scrollbar, Parallax, Keyboard]);
const arrivalsswiper = new Swiper('.arrivals__items', {

  slidesPerView: 'auto',
  spaceBetween: 24,

  loop: true,
  parallax: true,
  speed: 1000,

  keyboard: {
    enabled: true,
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // scrollbar: {
  //   el: '.reviews__items swiper-scrollbar',
  //   draggable: true,
  // },

    // Navigation arrows
    // navigation: {
    //   nextEl: '.arrivals__items .swiper-button-next',
    //   prevEl: '.arrivals__items .swiper-button-prev',
    // },

});


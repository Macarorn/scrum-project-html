new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween: 32,
  slidesPerGroup: 1, // <- Esto asegura que el desplazamiento sea de 3 en 3

  //Pagination bullets
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 1
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 1
    },
  }
});

//new Swiper('.card-wrapper', {
  //loop: true,
  //spaceBetween: 32,

  //Pagination bullets
  //pagination: {
    //el: '.swiper-pagination',
    //clickable: true,
    //dynamicBullets: true
  //},

  // Navigation arrows
  //navigation: {
    //nextEl: '.swiper-button-next',
    //prevEl: '.swiper-button-prev',
  //},

  //breakpoints: {
    //0: {
      //slidesPerView: 1
    //},
    //768: {
      //slidesPerView: 2
    //},
    //1024: {
      //slidesPerView: 3      
    //},
  //}

//});
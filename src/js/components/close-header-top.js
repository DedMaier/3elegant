const closeTaglineBtn = document.querySelector('.header-top__close');
const tagline = document.querySelector('.header-top');

closeTaglineBtn.onclick = function () {
    tagline.remove();
};

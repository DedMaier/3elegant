"use strict"
//==========================================
import {
  showErrorMessage,
  setBasketLocalStorage,
  getBasketLocalStorage,
  checkingRelevanceValueBasket
} from './utils.js';

import {
  COUNT_SHOW_CARDS_CLICK,
  ERROR_SERVER,
  NO_PRODUCTS_IN_THIS_CATEGORY
} from './constants.js';

const cards = document.querySelector('.cards');
const btnShowCards = document.querySelector('.show-cards');
let shownCards = COUNT_SHOW_CARDS_CLICK;
let countClickBtnShowCards = 1;
let productsData = [];

// Загрузка товаров
getProducts()

// Обработка клика по кнопке "Показать еще"
btnShowCards.addEventListener('click', sliceArrCards);
// Обработка клика по кнопке "В корзину"
cards.addEventListener('click', handleCardClick);


// Получение товаров
async function getProducts() {
  try {

    if (!productsData.length) {
      const res = await fetch('./../partials/data/bestseller.json');
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      productsData = await res.json();
    }

    if ((productsData.length > COUNT_SHOW_CARDS_CLICK) &&
      btnShowCards.classList.contains('none')) {
      btnShowCards.classList.remove('none');
    }

    renderStartPage(productsData);

  } catch (err) {
    showErrorMessage(ERROR_SERVER);
    console.log(err.message);
  }
}

function renderStartPage(data) {
  if (!data || !data.length) {
    showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY);
    return
  };

  const arrCards = data.slice(0, COUNT_SHOW_CARDS_CLICK);
  createCards(arrCards);

  checkingRelevanceValueBasket(data);

  const basket = getBasketLocalStorage();
  checkingActiveButtons(basket);
}


function sliceArrCards() {
  if (shownCards >= productsData.length) return;

  countClickBtnShowCards++;
  const countShowCards = COUNT_SHOW_CARDS_CLICK * countClickBtnShowCards;

  const arrCards = productsData.slice(shownCards, countShowCards);
  createCards(arrCards);
  shownCards = cards.children.length;

  if (shownCards >= productsData.length) {
    btnShowCards.classList.add('none');
  }
}


function handleCardClick(event) {
  const targetButton = event.target.closest('.card__add');
  if (!targetButton) return;

  const card = targetButton.closest('.card');
  const id = card.dataset.productId;
  const basket = getBasketLocalStorage();

  if (basket.includes(id)) return;

  basket.push(id);
  setBasketLocalStorage(basket);
  checkingActiveButtons(basket);
}


function checkingActiveButtons(basket) {
  const buttons = document.querySelectorAll('.card__add');

  buttons.forEach(btn => {
    const card = btn.closest('.card');
    const id = card.dataset.productId;
    const isInBasket = basket.includes(id);

    btn.disabled = isInBasket;
    btn.classList.toggle('active', isInBasket);
    btn.textContent = isInBasket ? 'В корзине' : 'В корзину';
  });
}


// Рендер карточки
function createCards(data) {
  data.forEach(card => {
    const { id, img, title, price, discount } = card;
    const priceDiscount = price - ((price * discount) / 100);
    const cardItem =
          `

            //  <article class="card" data-product-id="@id">
            //     <a href="/card.html?id=@id" class="card__link">
            //       <div class="card__picture">
            //         <img loading="lazy" src="../img/arrivals/@img.jpg" srcset="../img/arrivals/@img@2x.jpg 2x" class="card__image"
            //           width="262" height="349" alt="">
            //         <div class="card__new">@status</div>
            //         <div class="card__like">
            //           <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            //             <path fill-rule="evenodd" clip-rule="evenodd"
            //               d="M10.577 3.76422C10.2546 4.07365 9.74548 4.07365 9.42304 3.76422L8.84604 3.2105C8.17068 2.56239 7.25832 2.16667 6.25004 2.16667C4.17897 2.16667 2.50004 3.8456 2.50004 5.91667C2.50004 7.90219 3.57486 9.54171 5.1265 10.8888C6.67947 12.237 8.53621 13.1312 9.64558 13.5876C9.87754 13.683 10.1225 13.683 10.3545 13.5876C11.4639 13.1312 13.3206 12.237 14.8736 10.8888C16.4252 9.54171 17.5 7.90218 17.5 5.91667C17.5 3.8456 15.8211 2.16667 13.75 2.16667C12.7418 2.16667 11.8294 2.56239 11.154 3.2105L10.577 3.76422ZM10 2.00798C9.0268 1.074 7.70545 0.5 6.25004 0.5C3.2585 0.5 0.833374 2.92512 0.833374 5.91667C0.833374 11.2235 6.64199 14.1542 9.01153 15.1289C9.64968 15.3914 10.3504 15.3914 10.9885 15.1289C13.3581 14.1542 19.1667 11.2235 19.1667 5.91667C19.1667 2.92512 16.7416 0.5 13.75 0.5C12.2946 0.5 10.9733 1.074 10 2.00798Z" />
            //           </svg>
            //         </div>
            //         <button class="card__add card__btn btn btn--dark">
            //           Add to cart
            //         </button>
            //       </div>
            //       <div class="card__content">
            //         <div class="card__rating">

            //           @for (let i = 0; i < context.rating; i++)
            //           { <img src="../img/icon/star.svg" alt="Star"> }

            //         </div>
            //         <p class="card__title">@title</p>
            //         <p class="card__price">@price</p>
            //       </div>
            //     </a>
            //   </article>


                <div class="card" data-product-id="${id}">
                    <div class="card__top">
                        <a href="/card.html?id=${id}" class="card__image">
                            <img
                                src="./images/${img}"
                                alt="${title}"
                            />
                        </a>
                        <div class="card__label">-${discount}%</div>
                    </div>
                    <div class="card__bottom">
                        <div class="card__prices">
                            <div class="card__price card__price--discount">${priceDiscount}</div>
                            <div class="card__price card__price--common">${price}</div>
                        </div>
                        <a href="/card.html?id=${id}" class="card__title">${title}</a>
                        <button class="card__add">В корзину</button>
                    </div>
                </div>
            `
    cards.insertAdjacentHTML('beforeend', cardItem);
  });
}





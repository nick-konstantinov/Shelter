"use strict";
// Pagination

import { pets } from "../general/data-pets.js";

//Quantity cards depending on the width window on pet's page
function quantityCardsPets() {
    let widthWidow = document.documentElement.clientWidth;
    const desktopWidth = 1280;
    const tabletWidth = 768;
    let countCards;

    if (widthWidow >= desktopWidth) {
        countCards = 8;
    } else if (widthWidow >= tabletWidth) {
        countCards = 6;
    } else {
        countCards = 3;
    }

    return countCards;
}

// Create slider element
function createElemCard(parentElem, tagName, className, textContent) {
    const newElem = document.createElement(tagName);
    if (Array.isArray(className)) {
        className.forEach(item => newElem.classList.add(item))
    } else {
        newElem.classList.add(className);
    }
    newElem.innerHTML = textContent;
    parentElem.append(newElem);
    return newElem;
}

// Create slider elements
function createCardsELem(arr) {
    let cards = [];
    for (let i = 0; i < arr.length; i++) {
        const itemElem = document.createElement('div');
        itemElem.classList.add('our-friends__item');

        const cardElem = createElemCard(itemElem, 'div', 'our-friends__card', '');
        cardElem.setAttribute('data-number', arr[i].num);

        const contentElem = createElemCard(cardElem, 'div', 'our-friends__content', '');
        const photoElem = createElemCard(contentElem, 'div', 'our-friends__photo', '');

        const imgElem = createElemCard(photoElem, 'img', 'img', '');
        imgElem.setAttribute('src', arr[i].img);
        imgElem.setAttribute('alt', arr[i].type);

        const infoElem = createElemCard(contentElem, 'div', 'our-friends__info', '');
        const nameElem = createElemCard(infoElem, 'p', 'our-friends__name', '');
        nameElem.innerHTML = arr[i].name;

        const btnElem = createElemCard(infoElem, 'button', ['btn', 'btn-lrn'], 'Learn more');
        btnElem.setAttribute('type', 'button');

        cards.push(itemElem);
    }
    return cards;
}

// Make a total pets array
let totalPets = 48;
let allPets = [];
let count = totalPets / pets.length;

while(count) {
    for (let i = 0; i < pets.length; i++) {
        allPets.push(pets[i])
    }
    count--;
}

// Devide total pets array into parts depending on quantity cards
let cardsMap = new Map();
let currentSubArray = [];
let countPage = 1;
let countCardPerPage = quantityCardsPets();

function createCardsMap() {
    for (let i = 0; i < allPets.length; i++) {
        if ((i + 1) % countCardPerPage === 0) {
            currentSubArray.push(allPets[i]);
            if (countPage != 1) {
                currentSubArray.sort(() => Math.random() - 0.5);
            }
            let cardsArray = createCardsELem(currentSubArray);
            cardsMap.set(countPage, cardsArray);
            currentSubArray = [];
            countPage++;
        } else {
            currentSubArray.push(allPets[i]);
        }
    }
}

const list = document.querySelector('.our-friends__slider-list');

function appendCardsToPage() {
    for (let i = 0; i < cardsMap.size; i++) {
        let slide = document.createElement('div');
        slide.classList.add('our-friends__slider-slide');

        let slideWrapper = document.createElement('div');
        slideWrapper.classList.add('our-friends__slider-slide-wrapper');

        for (let j = 0; j < cardsMap.get(i + 1).length; j++) {
            slideWrapper.append(cardsMap.get(i + 1)[j]);
        }

        slide.append(slideWrapper);
        list.append(slide);
    }
}

function mathWidthSliderBoxElem() {
    let count = quantityCardsPets();
    let widthSliderBoxElem;

    if (count === 8) {
        widthSliderBoxElem = 1200;
    } else if (count === 6) {
        widthSliderBoxElem = 600;
    } else {
        widthSliderBoxElem = 300;
    }

    return widthSliderBoxElem;
}

function mathPositionEnd() {
    let count = quantityCardsPets();
    let offsetEndValue;

    if (count === 8) {
        offsetEndValue = 6000;
    } else if (count === 6) {
        offsetEndValue = 4200;
    } else {
        offsetEndValue = 4500;
    }

    return offsetEndValue;
}

let widthSliderBoxElem = mathWidthSliderBoxElem();
let offsetEndValue = mathPositionEnd();

// Current changed slides element position
let position = 0;

function moveLeft() {
    position -= widthSliderBoxElem;
    position = Math.max(position, - offsetEndValue);
    list.style.marginLeft = position + 'px';
}

function moveRight() {
    position += widthSliderBoxElem;
    position = Math.min(position, 0);
    list.style.marginLeft = position + 'px';
}

function moveEnd() {
    position = -offsetEndValue;
    list.style.marginLeft = position + 'px';
}

function moveStart() {
    position = 0;
    list.style.marginLeft = position + 'px';
}

// Current pagination element number
const paginationNumberElem = document.querySelector('.our-friends__pagination-number');
let paginationNumber = 1;

function changePaginationNumberNext() {
    if (paginationNumber < allPets.length / quantityCardsPets()) {
        paginationNumberElem.innerHTML = ++paginationNumber;
    }
}

function changePaginationNumberPrev() {
    if (paginationNumber != 1) {
        paginationNumberElem.innerHTML = --paginationNumber;
    }
}

function changePaginationNumberEnd() {
    paginationNumber = allPets.length / quantityCardsPets();
    paginationNumberElem.innerHTML = paginationNumber;
}

function changePaginationNumberStart() {
    paginationNumber = 1;
    paginationNumberElem.innerHTML = paginationNumber;
}

// Disable buttons left or right when position limit achived

function checkEndPaginationNumber() {
    if(position === -offsetEndValue) {
        btnNext.setAttribute("disabled", "disabled");
        btnNextEnd.setAttribute("disabled", "disabled");
    } else {
        btnNext.removeAttribute("disabled");
        btnNextEnd.removeAttribute("disabled");
    }
}

function checkStartPaginationNumber() {
    if(position === 0) {
        btnPrev.setAttribute("disabled", "disabled");
        btnPrevStart.setAttribute("disabled", "disabled");
    } else {
        btnPrev.removeAttribute("disabled");
        btnPrevStart.removeAttribute("disabled");
    }
}

// If DOM content loaded show cards and check pagination number
window.addEventListener('DOMContentLoaded', function() {
    createCardsMap()
    appendCardsToPage();
    checkStartPaginationNumber();
});

// Add listener for global window element, when resize window reload page
window.addEventListener('resize', function() {
    location.reload();
}, false);

// If navigation buttons pushed - shift left/right, change and check pagination number
const btnNext = document.querySelector('.our-friends__btn_next');
const btnPrev = document.querySelector('.our-friends__btn_prev');
const btnNextEnd = document.querySelector('.our-friends__btn_next-end');
const btnPrevStart = document.querySelector('.our-friends__btn_prev-start');


btnNext.addEventListener('click', function() {
    moveLeft();
    changePaginationNumberNext();
    checkEndPaginationNumber();
    checkStartPaginationNumber();
});

btnPrev.addEventListener('click', function() {
    moveRight();
    changePaginationNumberPrev();
    checkEndPaginationNumber();
    checkStartPaginationNumber();
});

btnNextEnd.addEventListener('click', function() {
    moveEnd();
    changePaginationNumberEnd();
    checkEndPaginationNumber();
    checkStartPaginationNumber();
});

btnPrevStart.addEventListener('click', function() {
    moveStart();
    changePaginationNumberStart();
    checkEndPaginationNumber();
    checkStartPaginationNumber();
});

"use strict";
// Slider

import { pets } from "../general/data-pets.js";

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

// Get quantity cards depending on the window width
export function quantityCards() {
    let widthWidow = document.documentElement.clientWidth;
    const desktopWidth = 1280;
    const tabletWidth = 768;
    let countCards;

    if (widthWidow >= desktopWidth) {
        countCards = 3;
    } else if (widthWidow >= tabletWidth) {
        countCards = 2;
    } else {
        countCards = 1;
    }
    return countCards;
}

// Create cards
let allPetsCards = createCardsELem(pets);

// Mix all cards
function mixCards(arr) {
    let newArr = arr.slice().sort(() => Math.random() - 0.5);
    return newArr;
}

// Mix all cards before push slider's buttons or relooad page
// Mix all cards if next and previous slides have duplicates
let allPetsCardsMixed;
do {
    allPetsCardsMixed = mixCards(allPetsCards);
} while (allPetsCardsMixed[3] === allPetsCards[0] ||
         allPetsCardsMixed[3] === allPetsCards[1] ||
         allPetsCardsMixed[3] === allPetsCards[2] ||
         allPetsCardsMixed[4] === allPetsCards[0] ||
         allPetsCardsMixed[4] === allPetsCards[1] ||
         allPetsCardsMixed[4] === allPetsCards[2] ||
         allPetsCardsMixed[5] === allPetsCards[0] ||
         allPetsCardsMixed[5] === allPetsCards[1] ||
         allPetsCardsMixed[5] === allPetsCards[2] ||
         allPetsCardsMixed[2] === allPetsCards[0] ||
         allPetsCardsMixed[2] === allPetsCards[1]
);

// Find slider's inner element
const sliderElem = document.querySelector('.our-friends__slider-inner');


// Create slider's slide elements on the right
let offset = 0;
function createSlideElemRight(){
    let slide = document.createElement('div');
    slide.classList.add('our-friends__slider-slide');
    slide.style.left = offset * 1050 + 'px';
    if (sliderElem) {
        sliderElem.append(slide);
    }
    offset = 1;

    return slide;
}

// Create slider's slide elements on the left
function createSlideElemLeft(){
    let slide = document.createElement('div');
    slide.classList.add('our-friends__slider-slide');
    slide.style.left = -1050 + 'px';
    if (sliderElem) {
        sliderElem.append(slide);
    }

    return slide;
}

import { drawModalWindow } from "../general/general.js";

// Flag for animation control
let isAnimationDuring = false;

// Animate slides
function animateSlides(slides, direction) {
    const slideWidth = 1050;
    const totalPixelsToMove = slideWidth;
    const pixelsPerSecond = 100;
    const pixelsPerInterval = 25;

    let slidesCount = slides.length;

    for (let i = 0; i < slides.length; i++) {
        let currentOffset = +slides[i].style.left.slice(0, -2);
        let currentPixelsMoved = 0;

        let slideInterval = setInterval(() => {
            if (currentPixelsMoved === totalPixelsToMove) {
                clearInterval(slideInterval);
                slidesCount--;
                if (slidesCount === 0) {
                    slides[0].remove();
                    isAnimationDuring = false;
                    drawModalWindow();
                }
                return;
            }
            if (direction === 'right') {
                currentOffset = currentOffset + pixelsPerInterval;
            } else if (direction === 'left') {
                currentOffset = currentOffset - pixelsPerInterval;
            }

            currentPixelsMoved += pixelsPerInterval;
            slides[i].style.left = currentOffset + 'px';
        }, 700 / pixelsPerSecond);
    }
}

// Move slides to the right side
function moveRight() {
    isAnimationDuring = true;
    const slides = document.body.querySelectorAll('.our-friends__slider-slide');
    animateSlides(slides, 'right');
    drawModalWindow();
}

// Move slides to the left side
function moveLeft() {
    isAnimationDuring = true;
    const slides = document.body.querySelectorAll('.our-friends__slider-slide');
    animateSlides(slides, 'left');
    drawModalWindow();
}

// Draw new card's elements
const prevBtn = document.body.querySelector('.btn-slider_prev');
const nextBtn = document.body.querySelector('.btn-slider_next');
let currentQuantityCards = quantityCards();

function drawCardsElem(slide, callback) {
    let amountCards = quantityCards();

    let moduloPart = allPetsCardsMixed.length % amountCards;
    let wholePart = Math.trunc(allPetsCardsMixed.length / amountCards);

    if (amountCards * wholePart > currentQuantityCards) {
        for (let i = currentQuantityCards; i < currentQuantityCards + amountCards; i++) {
            slide.append(allPetsCardsMixed[i]);
        }
        currentQuantityCards+=amountCards;
    } else {
        let addedCount = 0;

        // Append slides (count = moduloPart)
        for (let i = currentQuantityCards; i < currentQuantityCards + moduloPart; i++) {
            if ((currentQuantityCards + 1) < allPetsCardsMixed.length) {
                addedCount++;
                slide.append(allPetsCardsMixed[i]);
            }
        }
        currentQuantityCards += addedCount;

        // If added cards count less then should be on the page, add cards from array start elements
        if (addedCount < amountCards) {
            currentQuantityCards = 0;
            let needToAdd = amountCards - addedCount;
            for (let i = currentQuantityCards; i < needToAdd; i++) {
                slide.append(allPetsCardsMixed[i]);
            }
            currentQuantityCards += needToAdd;
        }
    }
    callback();
}

// If DOM content loaded add card(s) on the page
window.addEventListener('DOMContentLoaded', function() {
    let currentCountCards = quantityCards();
    let slide = createSlideElemRight();

    for(let i = 0; i < currentCountCards; i++) {
        slide.append(allPetsCards[i]);
    }
});

// Add listener for global window element, when resize window reload page
window.addEventListener('resize', function() {
    location.reload();
});

// If pushed next button - create new slide on the right, draw cards and shift left
if (nextBtn) {
    nextBtn.addEventListener('click', function() {
        if (!isAnimationDuring) {
            let slide = createSlideElemRight();
            drawCardsElem(slide, moveLeft);
        }
    });
}

// If pushed previous button - create new slide on the left, draw cards and shift right
if (prevBtn) {
    prevBtn.addEventListener('click', function() {
        if (!isAnimationDuring) {
            let slide = createSlideElemLeft();
            drawCardsElem(slide, moveRight);
        }
    });
}

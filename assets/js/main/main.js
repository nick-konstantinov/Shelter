"use strict";
// Slider

import { pets } from "../general/data-pets.js";

//Create new card's element
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

//Create card's element
function createCardsELem(arr) {
    let newArr = [];
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

        newArr.push(itemElem);
    }
    return newArr;
}

//Quantity cards depending on the width window
export function quantityCards() {
    let widthWidow = document.documentElement.clientWidth;
    const desktopWidth = 1280;
    const tabletWidth = 768;
    let countCards;

    if(widthWidow >= desktopWidth) {
        countCards = 3;
    } else if (widthWidow >= tabletWidth) {
        countCards = 2;
    } else {
        countCards = 1;
    }

    return countCards;
}

//Create cards collection
let allPetsCards = createCardsELem(pets);

//Mix all pet's cards
function mixCards(arr) {
    let newArr = arr.slice().sort(() => Math.random() - 0.5);
    return newArr;
}

//Mix all pet's cards before push slider's buttons or unlooad page
let allPetsCardsMixed;
// let quantity
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

//Find slider's inner element
const getSliderElem = () => document.body.querySelector('.our-friends__slider-inner');

const sliderElem = getSliderElem();

let offset = 0;

//Create slider's slide elements
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

function createSlideElemLeft(){
    let slide = document.createElement('div');
    slide.classList.add('our-friends__slider-slide');
    slide.style.left = -1050 + 'px';
    if (sliderElem) {
        sliderElem.append(slide);
    }

    return slide;
}

export let isAnimationDuring = false;

import { drawModalWindow } from "../general/general.js";


//Animation slides
function animateSlides(slides, direction) {
    const slideWidth = 1050;
    const pixelsPerSecond = 100;
    const pixelsPerInterval = 25;
    const totalPixelsToMove = slideWidth;

    let animationsCount = slides.length;

    for (let i = 0; i < slides.length; i++) {
        let currentOffset = +slides[i].style.left.slice(0, -2);
        let currentPixelsMoved = 0;

        let slideInterval = setInterval(() => {
            if (currentPixelsMoved === totalPixelsToMove) {
                clearInterval(slideInterval);
                animationsCount--;
                if (animationsCount === 0) {
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
            } else {
                throw new Error('Invalid direction');
            }
            currentPixelsMoved += pixelsPerInterval;
            slides[i].style.left = currentOffset + 'px';
        }, 700 / pixelsPerSecond);

    }
}

function moveRight() {
    isAnimationDuring = true;
    const slides = document.body.querySelectorAll('.our-friends__slider-slide');
    animateSlides(slides, 'right');
    drawModalWindow();
}

function moveLeft() {
    isAnimationDuring = true;
    const slides = document.body.querySelectorAll('.our-friends__slider-slide');
    animateSlides(slides, 'left');
    drawModalWindow();
}

//Draw new card's elements
const prevBtn = document.body.querySelector('.btn-slider_prev');
const nextBtn = document.body.querySelector('.btn-slider_next');

let current = quantityCards();

function drawCardsElem(slide, callback) {
    let amountCards = quantityCards();

    let moduloPart = allPetsCardsMixed.length % amountCards;
    let wholePart = Math.trunc(allPetsCardsMixed.length / amountCards);

    if (amountCards * wholePart > current) {
        for (let i = current; i < current + amountCards; i++) {
            slide.append(allPetsCardsMixed[i]);
        }
        current+=amountCards;
    } else {
        let addedCount = 0;
        for (let i = current; i < current + moduloPart; i++) {
            if ((current + 1) < allPetsCardsMixed.length) {
                addedCount++;
                slide.append(allPetsCardsMixed[i]);
            }
        }
        current+=addedCount;

        if (addedCount < amountCards) {
            current = 0;
            let needToAdd = amountCards - addedCount;
            for (let i = current; i < needToAdd; i++) {
                slide.append(allPetsCardsMixed[i]);
            }
            current+=needToAdd;
        }
    }
    callback();
}

//If DOM content loaded add card(s) on the page
window.addEventListener('DOMContentLoaded', function() {
    let currentCountCards = quantityCards();
    let slide = createSlideElemRight();

    for(let i = 0; i < currentCountCards; i++) {
        slide.append(allPetsCards[i]);
    }
});

//If pushed next button - create new slide on the right, draw cards and shift left
if (nextBtn) {
    nextBtn.addEventListener('click', function() {
        if (!isAnimationDuring) {
            let slide = createSlideElemRight();
            drawCardsElem(slide, moveLeft);
        }
    });
}


//If pushed previous button - create new slide on the left, draw cards and shift right
if (prevBtn) {
    prevBtn.addEventListener('click', function() {
        if (!isAnimationDuring) {
            let slide = createSlideElemLeft();
            drawCardsElem(slide, moveRight);
        }
    });
}

"use strict";
// General global variables
const mask = document.querySelector('.mask');
const body = document.body;
const modal = document.querySelector('.modal');

// Burger Menu
let burgerBtn = document.querySelector('#burger_nav');
let burgerMenu = document.querySelector('.burger-menu');

burgerBtn.addEventListener('click', function(){
	burgerBtn.classList.toggle('active');
	burgerMenu.classList.toggle('open');
    body.classList.toggle("noscroll");
    mask.hidden = !mask.hidden;
    renderListLinks();
})

const menu = document.querySelector("#header_nav").cloneNode(1);
const burgerLogo = document.querySelector("#logo").cloneNode(1);

// Add a menu, burgerLogo child nodes to burgerMenu node
function renderListLinks() {
    burgerMenu.appendChild(menu);
    burgerMenu.appendChild(burgerLogo);
}

// Add listeners for links to close burger menu
const links = Array.from(menu.children);
links.forEach((link) => {
    link.addEventListener("click", closeOnClick);
});

// Add listener for burgerLogo to close burger menu
burgerLogo.addEventListener('click', function(){
	closeOnClick();
});

// Add listener for mask to close burger menu and hide mask and modal
if (mask) {
    mask.addEventListener('click', function() {
        closeOnClick();
        if (modal) {
            modal.hidden = true;
        }
    });
}

// Change styles when burgermenu is closed
function closeOnClick() {
    burgerMenu.classList.remove("open");
    burgerBtn.classList.remove("active");
    body.classList.remove("noscroll");
    mask.hidden = !mask.hidden;
}

// Popup
import { mapPets } from "./data-pets.js";

// Show modal window
export function drawModalWindow() {
    const sliderElem = document.querySelector('.our-friends__slider-inner');
    sliderElem.addEventListener('click', function(event) {
        let cardElem = event.target.closest('.our-friends__card');

        if (!cardElem) return;

        if (!sliderElem.contains(cardElem)) return;

        mask.hidden = !mask.hidden;
        modal.hidden = !modal.hidden;
        body.classList.toggle("noscroll");
        fillModalContent(mapPets, cardElem.dataset.number);
    });
}

// Add content to modal window
function fillModalContent(map, key) {
    let currentPet = map.get(key);

    const imgElem = document.querySelector('.modal__photo img');
    imgElem.setAttribute('src', currentPet.img);
    imgElem.setAttribute('alt', currentPet.type);

    const nameElem = document.querySelector('.modal__name');
    nameElem.innerHTML = currentPet.name;

    const typeElem = document.querySelector('.modal__type');
    typeElem.innerHTML = currentPet.type;

    const breedElem = document.querySelector('.modal__breed');
    breedElem.innerHTML = currentPet.breed;

    const descriptionElem = document.querySelector('.modal__description');
    descriptionElem.innerHTML = currentPet.description;

    const ageElem = document.querySelector('.modal__age');
    ageElem.innerHTML = currentPet.age;

    const inoculationsElem = document.querySelector('.modal__inoculations');
    inoculationsElem.innerHTML = currentPet.inoculations;

    const diseasesElem = document.querySelector('.modal__diseases');
    diseasesElem.innerHTML = currentPet.diseases;

    const parasitesElem = document.querySelector('.modal__parasites');
    parasitesElem.innerHTML = currentPet.parasites;
}

// Add listener for window, when page loaded call drawModalWindow function
window.addEventListener('DOMContentLoaded', function() {
    drawModalWindow();
});

// Add listener for cross to close modal window
const cross = document.querySelector('.modal__cross');
if (cross) {
    cross.addEventListener('click', function() {
        modal.hidden = !modal.hidden;
        mask.hidden = !mask.hidden;
        body.classList.remove("noscroll");
    });
}

// Add listener for mask when mouseenter event to add hover for cross
if (mask) {
    mask.addEventListener('mouseenter', function() {
        if (cross) {
            cross.classList.toggle('hover');
        }
    });
}

// Add listener for mask when mouseleave event to remove hover for cross
if (mask) {
    mask.addEventListener('mouseleave', function() {
        if (cross) {
            cross.classList.toggle('hover');
        }
    });
}

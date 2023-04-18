//Slider

let pets = [
    {
    "name": "Katrine",
    "img": "./../../assets/images/general/cards/pets-katrine.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
    },
    {
    "name": "Jennifer",
    "img": "./../../assets/images/general/cards/pets-jennifer.png",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
    },
    {
    "name": "Woody",
    "img": "./../../assets/images/general/cards/pets-woody.png",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
    },
    {
    "name": "Sophia",
    "img": "./../../assets/images/general/cards/pets-sophia.png",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
    },
    {
    "name": "Timmy",
    "img": "./../../assets/images/general/cards/pets-timmy.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus", "viral rhinotracheitis"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
    },
    {
    "name": "Charly",
    "img": "./../../assets/images/general/cards/pets-charly.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    "age": "8 years",
    "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
    },
    {
    "name": "Scarlett",
    "img": "./../../assets/images/general/cards/pets-scarlet.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["parainfluenza"],
    "diseases": ["none"],
    "parasites": ["none"]
    },
    {
    "name": "Freddie",
    "img": "./../../assets/images/general/cards/pets-freddie.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
    }
];

let isAnimationDuring = false;

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
        const contentElem = createElemCard(cardElem, 'div', 'our-friends__content', '');
        const photoElem = createElemCard(contentElem, 'div', 'our-friends__photo', '');
        const imgElem = createElemCard(photoElem, 'img', 'img', '');
        imgElem.setAttribute('src', pets[i].img);
        imgElem.setAttribute('alt', pets[i].type);

        const infoElem = createElemCard(contentElem, 'div', 'our-friends__info', '');
        const nameElem = createElemCard(infoElem, 'p', 'our-friends__name', '');
        nameElem.innerHTML = pets[i].name;

        const btnElem = createElemCard(infoElem, 'button', ['btn', 'btn-lrn'], 'Learn more');
        btnElem.setAttribute('type', 'button');

        newArr.push(itemElem);
    }
    return newArr;
}

//Quantity cards depending on the width window
function quantityCards() {
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
    let newArr = arr.slice().sort(()=>Math.random()-0.5);
    return newArr;
}

//Mix all pet's cards before push slider's buttons or unlooad page
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
         allPetsCardsMixed[5] === allPetsCards[2]
);

//Find slider's inner element
const sliderElem = document.body.querySelector('.our-friends__slider-inner');

let offset = 0;

//Create slider's slide elements
function createSlideElemRight(){
    let slide = document.createElement('div');
    slide.classList.add('our-friends__slider-slide');
    slide.style.left = offset * 1050 + 'px';
    sliderElem.append(slide);
    offset = 1;

    return slide;
}

function createSlideElemLeft(){
    let slide = document.createElement('div');
    slide.classList.add('our-friends__slider-slide');
    slide.style.left = -1050 + 'px';
    sliderElem.append(slide);

    return slide;
}

//Offset left if push button next
function moveLeft() {
    isAnimationDuring = true;
    let slides = document.querySelectorAll('.our-friends__slider-slide');
    let offsetSlide = 0;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.left = offsetSlide * 1050 - 1050 + 'px';
        offsetSlide++;
    }
    //then remove old slide
    slides[0].addEventListener('transitionend', function() {
        slides[0].remove();
        isAnimationDuring = false;
    }, {once: true});
}

//Offset right if push button previous
function moveRight() {
    isAnimationDuring = true;
    let slides = document.body.querySelectorAll('.our-friends__slider-slide');
    let offsetSlide = 1;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.left = offsetSlide * 1050 + 'px';
        offsetSlide--;
    }
    //then remove old slide
    slides[0].addEventListener('transitionend', function() {
        slides[0].remove();
        isAnimationDuring = false;
    }, {once: true});
}

//Draw new card's elements
const prevBtn = document.body.querySelector('.btn-slider_prev');
const nextBtn = document.body.querySelector('.btn-slider_next');

let current = quantityCards();

function drawCardsElem(slide) {
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
nextBtn.addEventListener('click', function() {
    if (!isAnimationDuring) {
        let slide = createSlideElemRight();
        drawCardsElem(slide);
        moveLeft();
    }
});

//If pushed previous button - create new slide on the left, draw cards and shift right
prevBtn.addEventListener('click', function() {
    if (!isAnimationDuring) {
        let slide = createSlideElemLeft();
        drawCardsElem(slide);
        moveRight();
    }
});





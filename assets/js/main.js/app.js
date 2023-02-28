// Burger Menu

let burgerBtn = document.querySelector('#burger_nav');
let burgerMenu = document.querySelector('.burger-menu');
let logo = document.querySelector('#logo');
const body = document.body;

burgerBtn.addEventListener('click', function(){
	burgerBtn.classList.toggle('active');
	burgerMenu.classList.toggle('open');
    logo.classList.toggle('hidden');
    body.classList.toggle("noscroll");
    renderListLinks();
})

const menu = document.querySelector("#header_nav").cloneNode(1);
const burgerLogo = document.querySelector("#logo").cloneNode(1);

function renderListLinks() {
    burgerMenu.appendChild(menu);
    burgerMenu.appendChild(burgerLogo);
}

const links = Array.from(menu.children);

links.forEach((link) => {
    link.addEventListener("click", closeOnClick);
});

burgerLogo.addEventListener('click', function(){
	closeOnClick();
});

function closeOnClick() {
    logo.classList.remove('hidden');
    burgerMenu.classList.remove("open");
    burgerBtn.classList.remove("active");
    body.classList.remove("noscroll");
}
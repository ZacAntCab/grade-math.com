const menuBtn = document.querySelector('#menu-btn')
const menuIcon = document.querySelector('#menu-icon')
const header = document.querySelector('#header')
const calculatorsBtn = document.querySelector('#calculators-btn')
const calculatorsDropdown = document.querySelector('#calculators-dropdown')
const dropdownMenu = document.querySelector('#dropdown-menu')
let menuClicked = true;


menuBtn.addEventListener('click', () => {
    if (!menuClicked){
        menuIcon.style.fill = '#ffffff';
        menuBtn.classList.add('menu-btn-with-header')
        header.style.top = "0";
        menuClicked = true;
    }
    else {
        menuIcon.style.fill = '#912121';
        menuBtn.classList.remove('menu-btn-with-header')
        header.style.top = "-11vh";
        menuClicked = false;
    }
})

calculatorsBtn.addEventListener('mouseover', () => {
    dropdownMenu.style.top = "0"
})

calculatorsDropdown.addEventListener('mouseleave', () => {
    dropdownMenu.style.top = "-25vh"
})
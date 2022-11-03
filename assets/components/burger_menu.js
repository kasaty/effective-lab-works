let mainBurger = document.querySelector('.menu-burger');
let mainMenu = document.querySelector('.menu-main');

mainBurger.addEventListener("click", function(){
    mainMenu.classList.toggle("menu-main-active")
    mainMenu.classList.toggle("menu-main")
});


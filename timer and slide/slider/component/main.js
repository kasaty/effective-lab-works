let slides = document.getElementsByClassName("sliders");
let dots = document.getElementsByClassName("dot-icon");
let slideGetStorage = localStorage.getItem("slideIndex");
let slideIndex = slideGetStorage ? slideGetStorage : 1;
let slideSetStorage = () => { 
    localStorage.setItem("slideIndex", slideIndex);
}
let nextSlide = 1;
let prewSlide = -1;
showSlides(slideIndex);

window.addEventListener("keydown",(event)=> {
    if(event.code === "Space" || event.code === "ArrowRight"){
        plusSlider(nextSlide);
    }
    if(event.code === "ArrowLeft") {
        plusSlider(prewSlide);
    }
})

function plusSlider(n) {
    showSlides(slideIndex += n);
    slideSetStorage();
}

function currentSlider(n) {
    showSlides(slideIndex = n);
}

function checkSlider () {
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    for (i = 0; i < slides.length ; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length ; i++) {
        dots[i].className = dots[i].className.replace("active","");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function showSlides (n) {
    if (n < 1) {
        slideIndex = slides.length;
    }
    checkSlider();
    slideSetStorage();
}

function autoNextSlide () {
    setInterval(() => {
        slideIndex++;
        checkSlider();
        slideSetStorage();
    }, 5000)
}
autoNextSlide();
// particles
particlesJS("particles-js", {
    particles: {
        number: { value: 250, density: { enable: true, value_area: 800 } },
        color: { value: "#5DD6F4" },
        shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 3 },
            image: { src: "img/github.svg", width: 100, height: 100 },
        },
        opacity: {
            value: 1,
            random: true,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 3, size_min: 0.1, sync: true },
        },
        line_linked: {
            enable: false,
            distance: 500,
            color: "#ffffff",
            opacity: 0.4,
            width: 2,
        },
        move: {
            enable: true,
            speed: 3,
            direction: "top-right",
            random: true,
            straight: true,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "repulse" },
            resize: true,
        },
        modes: {
            grab: { distance: 400, line_linked: { opacity: 0.5 } },
            bubble: {
                distance: 400,
                size: 4,
                duration: 0.3,
                opacity: 1,
                speed: 3,
            },
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
        },
    },
    retina_detect: true,
});

//parallax effect
const homeImg = document.querySelector(".homeImg");
const section = document.querySelector(".section");
const nuwa = homeImg.querySelector("img");

var parallaxInstance = new Parallax(homeImg);

const slider = document.querySelector(".slider");
const homeTitle = document.querySelector(".homeTitle");
const sliderTitle = document.querySelector(".sliderTitle");

//maxtween and timeline
const tl = new TimelineMax();
tl.fromTo(
    homeImg,
    0.3,
    { height: "0%" },
    {
        height: "45vh",
        ease: Power2.ease,
    }
)
    .fromTo(homeImg, 0.4, { width: "0%" }, { width: "60%", ease: Power2.ease })
    .fromTo(
        slider,
        0.5,
        { x: "-1200px" },
        { x: "0%", ease: Power2.ease },
        "-=0.3"
    )
    .fromTo(
        slider,
        0.5,
        { width: "0%" },
        { width: "55%", ease: Power2.ease },
        "-=0.3"
    )
    .fromTo(
        slider,
        0.5,
        { height: "0%" },
        { height: "55%", ease: Power2.ease },
        "-=0.3"
    )
    .fromTo(
        homeTitle,
        0.5,
        { y: "-500px" },
        { y: "0%", ease: Power2.ease },
        "-=0.4"
    )
    .fromTo(
        sliderTitle,
        0.5,
        { opacity: 0 },
        { opacity: 1, ease: Power2.ease },
        "-=0.3"
    )
    .fromTo(
        nuwa,
        0.3,
        { opacity: 0 },
        { opacity: 1, ease: Power2.ease },
        "-=0.3"
    );

AOS.init();

const leftSide = document.querySelector(".leftSide");
const rightSide = document.querySelector(".rightSide");
const getStart = document.querySelector(".getStart");
const showMovie = document.querySelector(".showMovie");

const inp = document.querySelector("#inp");
const paiDosFilmes = document.querySelector(".filmes");
const classificacao = document.querySelector(".classificacao");

var count = 0;

const imgPreview = document.querySelector(".imgPreview img");
const titlePreviewH1 = document.querySelector(".titlePreview h1");
const titlePreviewSpan = document.querySelector(".titlePreview h1 span");
const titlePreviewGenre = document.querySelector(".titlePreview p");
const descriptionPreview = document.querySelector(".descriptionPreview p");
const box1 = document.querySelector(".box1");
const barraProgresso = document.querySelector(".barraProgresso");

const whatYouLookingFor = (arrayDeFilmesFodase) => {
    if (arrayDeFilmesFodase.length == 0 || inp.value == "") {
        box1.style.display = "flex";
    } else {
        box1.style.display = "none";
    }
};

const limparArrayDeFilmes = () => {
    let filmeBoxArray = document.querySelectorAll(".filmeBox");
    filmeBoxArray.forEach((sla) => sla.remove());
};

function createNewElementFunctional(filme) {
    barraProgresso.style.width = 0;

    if (filme.show.rating.average == null || filme.show.rating.average == "") {
        filme.show.rating.average = "R";
    }

    const newFilmeBox = document.createElement("div");
    newFilmeBox.className = "filmeBox";

    newFilmeBox.innerHTML = `
                    <div class="imgDoFilmeBox">
                                <img
                                    src="${filme.show.image.original}"
                                />
                            </div>
                            <div class="info">
                                <p class="tituloDoFilme">${filme.show.name}</p>
                                <p class="generoDoFilme">${filme.show.genres.join(
                                    ", "
                                )}</p>
                            </div>
                            <div class="nota">${filme.show.rating.average}</div>
                            <div class="hoverFilmeDiv"></div>
                    `;
    paiDosFilmes.appendChild(newFilmeBox);

    const showInfo = () => {
        if (count == 1) {
            // animation close
            count = 0;
            rightSide.style.width = "85%";
            showMovie.style.transform = "translateX(150%)";
            setTimeout(() => (showMovie.style.display = "none"), 1000);

            return;
        }
        //set values of infos
        imgPreview.src = filme.show.image.original;
        titlePreviewH1.textContent = filme.show.name;
        titlePreviewSpan.textContent = filme.show.schedule.time;
        titlePreviewGenre.textContent = filme.show.genres.join(", ");
        descriptionPreview.innerHTML = filme.show.summary;

        //animation start
        count = 1;
        rightSide.style.width = "50%";
        showMovie.style.transform = "translateX(0%)";
        showMovie.style.display = "block";
    };

    newFilmeBox.addEventListener("click", showInfo);
}

const searchMovies = () => {
    getStart.style.display = "none";

    let desgraca = document.querySelectorAll(".filmeBox");
    if (desgraca.length > 0) {
        desgraca.forEach((desgracaDaDesgraca) => desgracaDaDesgraca.remove());
    }

    if (inp.value == "") {
        classificacao.textContent = "Hmpf... Something is wrong";
    } else {
        classificacao.textContent = inp.value;
    }

    axios
        .get("http://api.tvmaze.com/search/shows?q=" + inp.value)
        .then(function (response) {
            let filmes = response.data;

            whatYouLookingFor(filmes);

            filmes.forEach((filme) => {
                createNewElementFunctional(filme);
            });
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {});
};

inp.addEventListener("change", searchMovies, false);

//close btn
const arrowBtn = document.querySelector(".arrow");

const closeShowMovie = () => {
    count = 0;
    rightSide.style.width = "85%";
    showMovie.style.transform = "translateX(150%)";
    setTimeout(() => (showMovie.style.display = "none"), 1500);
};

arrowBtn.addEventListener("click", closeShowMovie);

//top rating
const ratingBtns = document.querySelectorAll(".rating button");

ratingBtns.forEach((btn) => {
    const ratingFilms = () => {
        classificacao.textContent = `Best Episodes: ${btn.textContent}`;
        getStart.style.display = "none";

        axios
            .get("http://api.tvmaze.com/schedule/full")
            .then(function (response) {
                let filmes = response.data;

                filmes = filmes.sort((a, b) => {
                    return (
                        b._embedded.show.rating.average -
                        a._embedded.show.rating.average
                    );
                });
                filmes.forEach((filme, index) => {
                    if (
                        index < 100 &&
                        filme._embedded.show.genres.includes(
                            btn.textContent.trim()
                        )
                    ) {
                        createNewElementFunctional(filme._embedded);
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {});
    };

    btn.addEventListener("click", ratingFilms);
});

// series request
const seriesListBtn = document.querySelectorAll(".seriesListBtn button");

seriesListBtn.forEach((btn) => {
    const listingSeries = () => {
        getStart.style.display = "none";
        classificacao.textContent = `${btn.textContent}`;

        axios
            .get("http://api.tvmaze.com/schedule/full")
            .then(function (response) {
                let filmes = response.data;

                filmes.forEach((filme) => {
                    if (
                        filme._embedded.show.genres.indexOf(
                            btn.textContent.trim()
                        ) != -1
                    ) {
                        createNewElementFunctional(filme._embedded);
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {});
    };

    btn.addEventListener("click", listingSeries);
});

//body change color
$(function () {
    "use strict";
    var view = $(window).height();
    $(".dataColor")
        .height(view)
        .scrollie({
            scrollOffset: -50,
            scrollingInView: function (elem) {
                var bgColor = elem.data("background");
                $("body").css("background-color", bgColor);
            },
        });
});

// scrollbar position
const bottomSlider = document.querySelector(".bottomSlider");
const middleSectionTittle = document.querySelector(".middleSection h1");
const interfaceMovieApp = document.querySelector(".interface");
const textoSlider = document.querySelector(".texto");
const socialMediaSlider = document.querySelector(".socialMedia");
const leftSlider = document.querySelector(".leftSlider");
const rightSlider = document.querySelector(".rightSlider");

window.addEventListener("scroll", function (event) {
    // if (scroll_y < 900) {
    //     bottomSlider.style.transform = "translateY(100%)";
    //     return;
    // }

    var scroll_y = this.scrollY;
    var scroll_x = this.scrollX;
    console.log(scroll_y);

    if (scroll_y > 1500) {
        bottomSlider.style.transform = "translateY(0)";
        bottomSlider.style.opacity = 1;
        textoSlider.style.transform = "translateY(0)";
        socialMediaSlider.style.transform = "translateY(0)";
    }
    if (scroll_y < 1500) {
        bottomSlider.style.transform = "translateY(100%)";
        bottomSlider.style.opacity = 0;
        textoSlider.style.transform = "translateY(-100%)";
        socialMediaSlider.style.transform = "translateY(100%)";
    }
    if (scroll_y > 590) {
        middleSectionTittle.style.transform = "translateY(-300px)";
        middleSectionTittle.style.opacity = 0;
        leftSlider.style.transform = "translateX(0)";
        rightSlider.style.transform = "translateX(0)";
    }
    if (scroll_y < 590) {
        middleSectionTittle.style.transform = "translateY(0)";
        middleSectionTittle.style.opacity = 1;
        leftSlider.style.transform = "translateX(-100%)";
        rightSlider.style.transform = "translateX(100%)";
    }
    if (scroll_y < 1093) {
        getStart.style.opacity = 0;
        getStart.style.transform = "translateY(100%)";
        leftSide.style.transform = "translateY(100%)";
        rightSide.style.transform = "translateX(204%)";
        showMovie.style.transform = "translateX(150%)";
    }
    if (scroll_y > 1093) {
        leftSide.style.transform = "translateY(0)";
        rightSide.style.transform = "translateX(0)";
        getStart.style.transform = "translateY(0)";
        showMovie.style.transform = "translateX(0)";
        getStart.style.opacity = 1;
    }
});

//progress bar while scrolling
const updateDomMovieElements = () => {
    paiDosFilmes.onscroll = function () {
        myFunction();
    };

    function myFunction() {
        var winScroll = paiDosFilmes.scrollTop;
        var height = paiDosFilmes.scrollHeight - paiDosFilmes.clientHeight;
        var scrolled = (winScroll / height) * 100;
        barraProgresso.style.width = scrolled + "%";
    }
};

paiDosFilmes.addEventListener("DOMNodeInserted", updateDomMovieElements);

// initial Page In application
const appTitle = document.querySelector(".leftSide h1");

const goToHome = () => {
    let newFilmesArray = document.querySelectorAll(".filmeBox");
    if (newFilmesArray.length > 0) {
        newFilmesArray.forEach((filme) => {
            filme.remove();
        });
    }
    if (box1.style.display != "none") {
        box1.style.display = "none";
    }
    getStart.style.display = "block";
    if (barraProgresso.style.width != 0) {
        barraProgresso.style.width = 0;
    }
    if (classificacao.textContent != "Enjoy!") {
        classificacao.textContent = "Enjoy!";
    }
};

appTitle.addEventListener("click", goToHome);

//smooth scroll
var scroll = new SmoothScroll('.leftSlider a[href*="#"]', {
    speed: 800,
});

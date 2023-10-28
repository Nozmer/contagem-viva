import { dataEvent, dataPoint } from './dataJson.js';

let template_iconL_event = `<div class='layoutColumnInfoElementMap'>
<div style='display: none;' class='buttonOpenInfoMap'> <img src='{{linkImage}}' alt=''>
    <div class='content_buttonOpenInfoMap'>
        <h2 class='textLimiter'>{{name}}</h2>
        <h3 class='textLimiter'>{{localEvent}}</h3>
        <h3>{{dateEvent}}</h3>
    </div>
</div>

<div class='buttonMapLocal'> <img src='{{linkImage}}' alt=''>
    <h2 class='textLimiter'>{{name}}</h2>
</div>
</div> 
`;

let template_iconL_point = `<div class='layoutColumnInfoElementMap'>
<div style='display: none;' class='buttonOpenInfoMap'> <img src='{{linkImage}}' alt=''>
    <div class='content_buttonOpenInfoMap'>
        <h2 class='textLimiter'>{{name}}</h2>
        <h3 class='textLimiter'>{{localPoint}}</h3>
        <h3>Dia útil: {{timeDefault}}</h3>
    </div>
</div>

<div class='buttonMapLocal'> <img src='{{linkImage}}' alt=''>
    <h2 class='textLimiter'>{{name}}</h2>
</div>
</div> 
`;

let template_boxWrapEvent_menu2 = `<div class="boxWrapEvent_menu2">
<img src="{{linkImage}}" alt="">
<div class="paragraphContent_boxWrap">
    <h2 class="textLimiter">{{name}}</h2>
    <h3 class="textLimiter">{{localEvent}}</h3>
<h3>{{dateEvent}}</h3>
</div>
</div>
`;

let template_pointInfoColumn = `<div class="pointInfoColumn">
<div class="showInfoPoint">
    <img src="{{linkImage}}" alt="">
    <div class="content_showInfoPoint">
        <div class="barActionsPoint">
            <h1 class="textLimiter">{{name}}</h1>
            <div class="regionalIndicador">
                <h1>{{regional}}</h1>
            </div>
            <div class="openShowInfo no-select">
                <img src="assets/img/icons/icon-5.svg" alt="">
            </div>
        </div>
        <h3 class="textLimiter"><span class="subColor">Sobre: </span>{{aboutPoint}}</h3>
    </div>
</div>
<div class="infoPoint">
    <div class="row_infoPoint">
        <div class="content_infoPoint">
            <h3><span class="subColor">Sobre: </span>{{aboutPoint}}</h3>
            <h3><span class="subColor">Localização: </span>{{localPoint}}</h3>
            <h3><span class="subColor">Fundador(es): </span>{{founderPoint}}</h3>
        </div>
        <div class="timeAndPhotoInfo">
            <div class="timeBox">
                <h1>Horario:</h1>
                <div class="content_timeBox">
                    <div class="dayRow_timeBox">
                        <h1 class="textLimiter">Segunda-feira</h1>
                        <h1 class="colorTimeBox textLimiter closeTimeBox">{{timeDefault}}</h1>
                    </div>
                    <div class="dayRow_timeBox">
                        <h1 class="textLimiter">terça-feira</h1>
                        <h1 class="colorTimeBox textLimiter">{{timeDefault}}</h1>
                    </div>
                    <div class="dayRow_timeBox">
                        <h1 class="textLimiter">quarta-feira</h1>
                        <h1 class="colorTimeBox textLimiter">{{timeDefault}}</h1>
                    </div>
                    <div class="dayRow_timeBox">
                        <h1 class="textLimiter">quinta-feira</h1>
                        <h1 class="colorTimeBox textLimiter">{{timeDefault}}</h1>
                    </div>
                    <div class="dayRow_timeBox">
                        <h1 class="textLimiter">sexta-feira</h1>
                        <h1 class="colorTimeBox textLimiter">{{timeDefault}}</h1>
                    </div>
                    <div class="dayRow_timeBox">
                        <h1 class="textLimiter">sábado</h1>
                        <h1 class="colorTimeBox textLimiter">{{timeSab}}</h1>
                    </div>
                    <div class="dayRow_timeBox">
                        <h1 class="textLimiter">domingo</h1>
                        <h1 class="colorTimeBox textLimiter">{{timeDom}}</h1>
                    </div>
                </div>
            </div>
            <img src="{{linkImage}}" alt="">
        </div>
    </div>
</div>
</div>
`;

// main
function menuChange() {
    let button = document.querySelectorAll(".iconBoxVerticalMobile");
    let menus = document.querySelectorAll(".menus");

    button.forEach((element, index) => {
        // style element
        element.addEventListener('mouseover', () => {
            if (!element.id) {
                element.style.color = "#FFF";

                element.addEventListener('mouseout', () => {
                    element.style.color = "#FFAB2D";
                });
            };
        });

        element.addEventListener("click", () => {
            if (index == 1) {
                createMap(isEventVar);
            };

            // change backgroud
            menus.forEach(element => {
                element.style.display = "none";
            });
            menus[index].style.display = "flex";

            // change button
            button.forEach(element => {
                element.id = "";
            });
            element.id = "selectIconMenu";
        });
    });
};

//menu1
function passSlide() {
    const slider = document.querySelector('#slider');
    const slideWidth = document.querySelector('.slide').offsetWidth;
    const ballIndicador = document.querySelectorAll(".ballIndicador");
    let lastElement = ballIndicador.length - 1;
    let currentIndex = 0;

    document.querySelectorAll(".ballButtonNext")[0].addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            animateSlider();
        }
    });

    document.querySelectorAll(".ballButtonNext")[1].addEventListener("click", function () {
        if (currentIndex < slider.children.length - 1) {
            currentIndex++;
            animateSlider();
        }
    });

    function animateSlider() {
        anime({
            targets: slider,
            translateX: -currentIndex * slideWidth, // Desloca o slider para a posição correta
            duration: 100,
            easing: 'easeOutExpo',
        });

        // change ball
        ballIndicador.forEach(element => {
            element.id = "";
        });
        ballIndicador[currentIndex].id = "selectballIndicador";
    }

    // time pass
    function passTime() {
        setTimeout(() => {
            if (currentIndex < slider.children.length - 1) {
                currentIndex++;
                animateSlider();
                passTime();
            } else {
                if (currentIndex == lastElement) {
                    currentIndex = 0;
                    animateSlider();
                    passTime();
                }
            }
        }, 3000);
    };
    passTime();
}

// menu2
function changeEventToPoint() {
    let elementClick = document.querySelectorAll(".buttonBox_menu2");

    elementClick.forEach((element, index) => {
        element.addEventListener("click", () => {
            element.classList.add('select_buttonBox_menu2');

            currentPage = 1;
            if (index == 1) {
                elementClick[0].classList.remove('select_buttonBox_menu2');
                clean();
                loadItemsForPage(currentPage, false);
                makerMap(false)

            } else {
                elementClick[1].classList.remove('select_buttonBox_menu2');
                clean();
                loadItemsForPage(currentPage, true);
                makerMap(true)
            }
        })
    });
}

function eventAnimationOpenInfo(element) {
    const objectClick = element.querySelector(".openShowInfo");
    const icon = element.querySelector(".openShowInfo img");
    const elementOpen = element.querySelector(".infoPoint");
    let offset = objectClick.offsetTop;
    elementOpen.style.transform = `translateY(-${offset / 2}px)`;


    objectClick.addEventListener("click", function () {
        let offset = objectClick.offsetTop;

        if (elementOpen.style.transform == `translateY(-${offset / 2}px)`) {
            elementOpen.style.display = "flex";
            // icon
            anime({
                targets: icon,
                rotate: 180,
                duration: 400,
                easing: 'easeOutExpo',
            });

            // elementOpen
            anime({
                targets: elementOpen,
                opacity: 1,
                translateY: 0,
                duration: 600,
                easing: 'easeOutExpo',
            });
        } else {
            anime({
                targets: icon,
                rotate: 0,
                duration: 400,
                easing: 'easeOutExpo',
            });

            // elementOpen
            anime({
                targets: elementOpen,
                opacity: 0,
                translateY: -offset / 2, // Desloca o slider para a posição correta
                duration: 300,
                easing: 'easeOutExpo',
                complete: function () {
                    elementOpen.style.display = "none";
                }
            });

        };
    });
};

// loadItensEvent
let currentPage = 1;
let isEventVar = true;
let leastPage;
var map = L.map('map').setView([-19.913791537265134, -44.075441347665994], 12);

function loadItemsForPage(page, isEvent, searchQuery = "") {
    isEventVar = isEvent ? true : false;
    let dataJs = isEvent ? dataEvent : dataPoint;
    let totalItens = dataJs.name.length;
    let itensForPage = 6;
    leastPage = Math.ceil(totalItens / itensForPage);
    let textPage = document.querySelector("#markerPage h2");

    // display div and hidden
    let eventOrPoint = isEvent ? document.querySelector("#tabEvent") : document.querySelector("#tabPoint");
    let hiddenElement = isEvent ? document.querySelector("#tabPoint") : document.querySelector("#tabEvent");
    hiddenElement.style.display = "none";
    eventOrPoint.style.display = isEvent ? "grid" : "flex";

    if (searchQuery != "" && searchQuery != undefined) {
        const filteredItems = dataJs.name.filter((name, index) => {
            const local = isEvent ? dataJs.localEvent[index] : dataJs.localPoint[index];
            const dateOrRegional = isEvent ? dataJs.dateEvent[index] : dataJs.regional[index];
            const searchTerm = searchQuery.toLowerCase();

            return (
                name.toLowerCase().includes(searchTerm) ||
                local.toLowerCase().includes(searchTerm) ||
                dateOrRegional.toLowerCase().includes(searchTerm)
            );
        });

        const startIdx = (page - 1) * itensForPage;
        const endIdx = Math.min(startIdx + itensForPage, filteredItems.length);

        for (let i = startIdx; i < endIdx; i++) {
            const dataIndex = dataJs.name.indexOf(filteredItems[i]);

            let handlebarsTemplate = isEvent ? template_boxWrapEvent_menu2 : template_pointInfoColumn;

            const compiledTemplate = Handlebars.compile(handlebarsTemplate);

            const data = isEvent ? {
                name: dataJs.name[dataIndex],
                localEvent: dataJs.localEvent[dataIndex],
                dateEvent: dataJs.dateEvent[dataIndex],
                linkImage: dataJs.linkImage[dataIndex]
            } : {
                name: dataJs.name[dataIndex],
                regional: dataJs.regional[dataIndex],
                historyPoint: dataJs.historyPoint[dataIndex],
                aboutPoint: dataJs.aboutPoint[dataIndex],
                localPoint: dataJs.localPoint[dataIndex],
                timeDefault: dataJs.timeDefault[dataIndex],
                timeSab: dataJs.timeSab[dataIndex],
                timeDom: dataJs.timeDom[dataIndex],
                founderPoint: dataJs.founderPoint[dataIndex],
                linkImage: dataJs.linkImage[dataIndex]
            };

            const renderedHtml = compiledTemplate(data);

            const insertElement = isEvent ? document.querySelector('#tabEvent') : document.querySelector('#tabPoint');
            insertElement.insertAdjacentHTML('beforeend', renderedHtml);
        }
    } else {
        const startIdx = (page - 1) * itensForPage;
        const endIdx = Math.min(startIdx + itensForPage, totalItens);

        for (let i = startIdx; i < endIdx; i++) {
            let handlebarsTemplate = isEvent ? template_boxWrapEvent_menu2 : template_pointInfoColumn;

            const compiledTemplate = Handlebars.compile(handlebarsTemplate);

            const data = isEvent ? {
                name: dataJs.name[i],
                localEvent: dataJs.localEvent[i],
                dateEvent: dataJs.dateEvent[i],
                linkImage: dataJs.linkImage[i]
            } : {
                name: dataJs.name[i],
                regional: dataJs.regional[i],
                historyPoint: dataJs.historyPoint[i],
                aboutPoint: dataJs.aboutPoint[i],
                localPoint: dataJs.localPoint[i],
                timeDefault: dataJs.timeDefault[i],
                timeSab: dataJs.timeSab[i],
                timeDom: dataJs.timeDom[i],
                founderPoint: dataJs.founderPoint[i],
                linkImage: dataJs.linkImage[i]
            };

            const renderedHtml = compiledTemplate(data);

            const insertElement = isEvent ? document.querySelector('#tabEvent') : document.querySelector('#tabPoint');
            insertElement.insertAdjacentHTML('beforeend', renderedHtml);

            if (!isEvent) {
                const element = document.querySelector("#tabPoint").lastElementChild;
                eventAnimationOpenInfo(element);
            };
        }
    }

    textPage.textContent = `Página ${page} de ${leastPage}`;
};

function initPagesEvent() {
    const searchQuery = document.querySelector('#segmented_conteinerLeft_menu2 input');
    searchQuery.addEventListener("change", () => {
        search();
    });

    searchQuery.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            search();
        }
    });

    const prev = document.querySelectorAll(".buttonMarkPage")[0];
    prev.addEventListener("click", () => {
        prevPage();
    });

    const next = document.querySelectorAll(".buttonMarkPage")[1];
    next.addEventListener("click", () => {
        nextPage();
    });
};

function clean() {
    const clean = isEventVar ? document.querySelector('#tabEvent') : document.querySelector('#tabPoint');
    clean.innerHTML = '';
}

function search() {
    const searchQuery = document.querySelector('#inputSearchBox input').value;
    console.log(searchQuery);
    currentPage = 1;
    clean();
    loadItemsForPage(currentPage, isEventVar, searchQuery);
}

function nextPage() {
    if (currentPage < leastPage) {
        currentPage++;
        clean();
        loadItemsForPage(currentPage, isEventVar);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        clean();
        loadItemsForPage(currentPage, isEventVar);
    }
}
// end loadItensEvent

function makerMap(isEvent) {
    let dataJs = isEvent ? dataEvent : dataPoint;

    const divEvent = document.querySelectorAll(".div-event");
    if (divEvent) {
        divEvent.forEach(element => {
            element.remove();
        });
    };

    for (let i = 0; i < dataJs.name.length; i++) {
        const postionSeparate = isEvent ? dataJs.coordinateEvent[i].split(" ") : dataJs.coordinatePoint[i].split(" ");

        const handlebarsTemplate = isEvent ? template_iconL_event : template_iconL_point;

        const compiledTemplate = Handlebars.compile(handlebarsTemplate);

        const data = isEvent ? {
            name: dataJs.name[i],
            localEvent: dataJs.localEvent[i],
            dateEvent: dataJs.dateEvent[i],
            linkImage: dataJs.linkImage[i]
        } : {
            name: dataJs.name[i],
            localPoint: dataJs.localPoint[i],
            timeDefault: dataJs.timeDefault[i],
            linkImage: dataJs.linkImage[i]
        };

        const renderedHtml = compiledTemplate(data);

        let infoEvent = L.divIcon({
            className: 'div-event',
            html: renderedHtml
        });

        L.marker([postionSeparate[0], postionSeparate[1]], { icon: infoEvent }).addTo(map);
    };

    openInfoMap();
}

function createMap() {
    setTimeout(function () {
        map.invalidateSize(true);
    }, 1000);

    var myStyle = {
        "weight": 4,
        "opacity": 0.65,
        "fillOpacity": 0.050
    };

    makerMap(true)

    L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(map);

    fetch('https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3118601?formato=application/vnd.geo+json')
        .then(response => response.json())
        .then(data => {

            L.geoJSON(data, {
                style: myStyle
            }).addTo(map);

            // map.fitBounds(municipioLayer.getBounds());
        });
}

function openInfoMap() {
    let buttonClick = document.querySelectorAll(".buttonMapLocal");

    buttonClick.forEach((element) => {
        element.addEventListener("click", () => {
            let parentElement = element.parentElement;
            let buttonInfo = parentElement.querySelector(".buttonOpenInfoMap");

            if (element.style.background == "rgb(255, 255, 255)" || element.style.background == "") {
                buttonInfo.style.display = "flex";
                element.style.background = "#393939";
                element.querySelector("h2").style.color = "#FFF";
            } else {
                buttonInfo.style.display = "none";
                element.style.background = "#FFF";
                element.querySelector("h2").style.color = "#000";
            }
        });
    });

}

document.addEventListener('DOMContentLoaded', function () {
    loadItemsForPage(currentPage, isEventVar);
    initPagesEvent();
    menuChange();
    changeEventToPoint();
    passSlide();
});
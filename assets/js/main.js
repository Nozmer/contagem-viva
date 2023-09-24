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
    elementClick = document.querySelectorAll(".buttonBox_menu2");

    elementClick.forEach((element, index) => {
        element.addEventListener("click", () => {
            element.classList.add('select_buttonBox_menu2');

            if (index == 1) {
                elementClick[0].classList.remove('select_buttonBox_menu2');


            } else {
                elementClick[1].classList.remove('select_buttonBox_menu2');

            }
        })
    });
}

// loadItensEvent
let currentPage = 1;
let leastPage;

function loadItemsForPage(page, searchQuery = "") {
    fetch('http://127.0.0.1:5500/assets/js/dataEvent.json')
        .then((response) => response.json())
        .then((json) => {
            let totalItens = json.nameEvent.length
            let itensForPage = 6
            leastPage = Math.ceil(totalItens / itensForPage);
            let textPage = document.querySelector("#markerPage h2");

            if (searchQuery != "") {
                const filteredItems = json.nameEvent.filter((name, index) => {
                    const local = json.localEvent[index];
                    const date = json.dateEvent[index];
                    const searchTerm = searchQuery.toLowerCase();

                    return (
                        name.toLowerCase().includes(searchTerm) ||
                        local.toLowerCase().includes(searchTerm) ||
                        date.toLowerCase().includes(searchTerm)
                    );
                });

                const startIdx = (page - 1) * itensForPage;
                const endIdx = Math.min(startIdx + itensForPage, filteredItems.length);

                for (let i = startIdx; i < endIdx; i++) {
                    const dataIndex = json.nameEvent.indexOf(filteredItems[i]);

                    fetch('assets/js/template/boxWrapEvent.handlebars')
                        .then(response => response.text())
                        .then(template => {
                            const compiledTemplate = Handlebars.compile(template);

                            const data = {
                                nameEvent: json.nameEvent[dataIndex],
                                localEvent: json.localEvent[dataIndex],
                                dateEvent: json.dateEvent[dataIndex],
                                linkImage: json.linkImage[dataIndex]
                            };

                            const renderedHtml = compiledTemplate(data);

                            const insertElement = document.querySelector('.boxesWrap_menu2');
                            insertElement.insertAdjacentHTML('beforeend', renderedHtml);
                        });
                }
            } else {
                const startIdx = (page - 1) * itensForPage;
                const endIdx = Math.min(startIdx + itensForPage, totalItens);

                for (let i = startIdx; i < endIdx; i++) {
                    fetch('assets/js/template/boxWrapEvent.handlebars')
                        .then(response => response.text())
                        .then(template => {
                            const compiledTemplate = Handlebars.compile(template);

                            const data = {
                                nameEvent: json.nameEvent[i],
                                localEvent: json.localEvent[i],
                                dateEvent: json.dateEvent[i],
                                linkImage: json.linkImage[i]
                            };

                            const renderedHtml = compiledTemplate(data);

                            const insertElement = document.querySelector('.boxesWrap_menu2');
                            insertElement.insertAdjacentHTML('beforeend', renderedHtml);
                        });
                }
            }

            textPage.textContent = `Página ${page} de ${leastPage}`;
        })
        .catch(error => {
            console.error('Erro durante o processo:', error);
        });
}

function search() {
    const searchQuery = document.querySelector('#inputSearchBox input').value;
    currentPage = 1;
    document.querySelector('.boxesWrap_menu2').innerHTML = '';
    loadItemsForPage(currentPage, searchQuery);
}

function nextPage() {
    if (currentPage < leastPage) {
        currentPage++;
        document.querySelector('.boxesWrap_menu2').innerHTML = ''; // Limpa os itens anteriores
        loadItemsForPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        document.querySelector('.boxesWrap_menu2').innerHTML = ''; // Limpa os itens anteriores
        loadItemsForPage(currentPage);
    }
}
// end loadItensEvent

function createMap() {
    var map = L.map('map').setView([-19.913791537265134, -44.07441347665994], 12);

    fetch('http://127.0.0.1:5500/assets/js/dataEvent.json')
        .then((response) => response.json())
        .then((json) => {
            const fetchAndMarkerPromises = [];

            for (let i = 0; i < json.nameEvent.length; i++) {
                const postionSeparate = json.coordinateEvent[i].split(" ");

                const fetchPromise = fetch('assets/js/template/pointMap.handlebars')
                    .then(response => response.text());

                const markerPromise = fetchPromise.then(template => {
                    const compiledTemplate = Handlebars.compile(template);

                    const data = {
                        nameEvent: json.nameEvent[i],
                        localEvent: json.localEvent[i],
                        dateEvent: json.dateEvent[i],
                        linkImage: json.linkImage[i]
                    };

                    const renderedHtml = compiledTemplate(data);

                    infoEvent = L.divIcon({
                        className: 'div-event',
                        html: renderedHtml
                    });

                    return L.marker([postionSeparate[0], postionSeparate[1]], { icon: infoEvent });
                });

                fetchAndMarkerPromises.push(markerPromise);
            }

            return Promise.all(fetchAndMarkerPromises);
        })
        .then(markers => {
            markers.forEach(marker => marker.addTo(map));
            openInfoMap();
        })
        .catch(error => {
            console.error('Erro durante o processo:', error);
        });


    var myStyle = {
        "weight": 4,
        "opacity": 0.65,
        "fillOpacity": 0.050
    };

    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(map);

    fetch('https://servicodados.ibge.gov.br/api/v3/malhas/municipios/3118601?formato=application/vnd.geo+json')
        .then(response => response.json())
        .then(data => {

            L.geoJSON(data, {
                style: myStyle
            }).addTo(map);

            map.fitBounds(municipioLayer.getBounds());
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

loadItemsForPage(currentPage);
createMap();
menuChange();
changeEventToPoint();
passSlide();
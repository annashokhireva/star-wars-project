const ul = document.querySelector('ul.names');
const charInfo = document.querySelector('section.details > div.char-info');
const additionalInfo = document.querySelector('section.details > div.additional-info');
const counter = document.querySelector('.counter');
const prevBtn = document.querySelector('button.prev-page');
const nextBtn = document.querySelector('button.next-page');
const infoNav = document.querySelector('.info-navigation');
const planetTab = document.querySelector('div.info-navigation > div.planet');
const speciesTab = document.querySelector('div.info-navigation > div.species');
const vehiclesTab = document.querySelector('div.info-navigation > div.vehicles');
const starshipsTab = document.querySelector('div.info-navigation > div.starships');


let next = 'http://swapi.dev/api/people/?page=1';
let previous;
let characters = [];
let species = [];
let vehicles = [];
let starships = [];
let currentPage = 1;
let totalPages = 0;
const rowsPerPage = 10;


prevBtn.addEventListener('click', function () {
    if (previous != null) {

        getCharData(previous);
        currentPage--;
        removeAllChildNodes(charInfo);
        removeAllChildNodes(additionalInfo);
        loader();
    }
});


nextBtn.addEventListener('click', function () {
    if (next != null) {

        getCharData(next);
        currentPage++;
        removeAllChildNodes(charInfo);
        removeAllChildNodes(additionalInfo);
        loader();
    }
});


const pagePagination = () => {
    counter.innerHTML = currentPage + ' / ' + totalPages;

}


const removeAllChildNodes = (parent) => {

    while (parent.firstChild) {

        parent.removeChild(parent.firstChild);
    }
}


const getCharacter = (el) => {
    el = el || ul.querySelector('.clicked');

    return characters[el.getAttribute('data-index')] || {};
}


const charListItem = (char, index) => {
    let name = char.name;

    const li = document.createElement('li');
    li.setAttribute('data-index', index);
    ul.appendChild(li);
    const textNode = document.createTextNode(name);
    li.appendChild(textNode);
}


const renderCharList = () => {

    removeAllChildNodes(ul);

    for (let i = 0; i < characters.length; i++) {
        const char = characters[i];

        charListItem(char, i);
    }
}


ul.addEventListener('click', e => {
    if (e.target.tagName !== 'LI') return;

    ul.querySelectorAll('.clicked').forEach(li => {
        li.classList.remove('clicked');
    });

    e.target.classList.add('clicked');

    let char = getCharacter();

    removeAllChildNodes(charInfo);
    charDetails(char);

    removeAllChildNodes(additionalInfo);
    planetDetails(char.homeworld); 
});


const charDetails = (char) => {
    let description = [
        `Height: ${char.height}`,
        `Mass: ${char.mass}`,
        `Hair color: ${char.hair_color}`,
        `Skin color: ${char.skin_color}`,
        `Eye color: ${char.eye_color}`,
        `Birth year: ${char.birth_year}`,
        `Gender: ${char.gender}`
    ];

    text = '<ul>';

    for (let i = 0; i < description.length; i++) {
        const feature = description[i];
        text += '<li>' + feature + '</li>';
    };

    text += '</ul>';
    const pElement = document.createElement('p');
    const h3Element = document.createElement('h3');

    pElement.innerHTML = text;
    h3Element.textContent = char.name;
    charInfo.appendChild(h3Element);
    charInfo.appendChild(pElement);
}


const planetDetails = (homeworldUrl) => {
    fetch(homeworldUrl)
        .then(response => response.json())
        .then(planetData => {

            planet = planetData.name;

            let description = [
                `Rotation period: ${planetData.rotation_period}`,
                `Orbital period: ${planetData.orbital_period}`,
                `Diameter: ${planetData.diameter}`,
                `Climate: ${planetData.climate}`,
                `Gravity: ${planetData.gravity}`,
                `Terrain: ${planetData.terrain}`
            ];

            text = '<ul>';

            for (let i = 0; i < description.length; i++) {
                const feature = description[i];
                text += '<li>' + feature + '</li>';
            };

            text += '</ul>';

            const pElement = document.createElement('p');
            const h3Element = document.createElement('h3');

            pElement.innerHTML = text;
            h3Element.textContent = planet;
            additionalInfo.appendChild(h3Element);
            additionalInfo.appendChild(pElement);
        })
};


const speciesDescription = (speciesUrls) => {
    let promises = [];

    for (let url of speciesUrls) {
        promises.push(fetch(url));
    }

    return Promise.all(promises)
        .then(responses => {
            return Promise.all(responses.map(response => response.json()))
                .then(speciesData => {

                    species = speciesData;

                    removeAllChildNodes(additionalInfo);

                    for (let i = 0; i < species.length; i++) {
                        const spec = species[i];
             
                        let name = spec.name;

                        const h3Element = document.createElement('h3');
                        const pElement = document.createElement('p');

                        pElement.innerHTML = `Classification: ${spec.classification}`;
                        h3Element.textContent = name;
                        additionalInfo.appendChild(h3Element);
                        additionalInfo.appendChild(pElement);

                    };
    
                })
        })
};


const vehicleDescription = (vehicleUrls) => {
    let promises = [];

    for (let url of vehicleUrls) {
        promises.push(fetch(url));
    }

    return Promise.all(promises)
        .then(responses => {
            return Promise.all(responses.map(response => response.json()))
                .then(vehicleData => {

                    vehicles = vehicleData;

                    removeAllChildNodes(additionalInfo);

                    for (let i = 0; i < vehicles.length; i++) {
                        const vehicle = vehicles[i];
             
                        let name = vehicle.name;

                        const h3Element = document.createElement('h3');
                        const pElement = document.createElement('p');

                        pElement.innerHTML = `Model: ${vehicle.model}`;
                        h3Element.textContent = name;
                        additionalInfo.appendChild(h3Element);
                        additionalInfo.appendChild(pElement);
                        
                    };
    
                })
        })
};


const starshipsDescription = (starshipsUrls) => {
    let promises = [];

    for (let url of starshipsUrls) {
        promises.push(fetch(url));
    }

    return Promise.all(promises)
        .then(responses => {
            return Promise.all(responses.map(response => response.json()))
                .then(starshipData => {

                    starships = starshipData;

                    removeAllChildNodes(additionalInfo);

                    for (let i = 0; i < starships.length; i++) {
                        const starship = starships[i];
             
                        let name = starship.name;

                        const h3Element = document.createElement('h3');
                        const pElement = document.createElement('p');

                        pElement.innerHTML = `Model: ${starship.model}`;
                        h3Element.textContent = name;
                        additionalInfo.appendChild(h3Element);
                        additionalInfo.appendChild(pElement);
                        
                    };
    
                })
        })
};


const getCharData = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(charData => {

            next = charData.next;
            previous = charData.previous;
            characters = charData.results;
            totalPages = Math.ceil(charData.count / rowsPerPage);

            renderCharList();
            pagePagination();
        });
}

getCharData(next);


const navSelection = (tab) => {

    infoNav.querySelectorAll('.selected').forEach(div => {
        div.classList.remove('selected');
    });

    tab.classList.add('selected');

}


planetTab.addEventListener('click', function () {
    
   navSelection(planetTab);

    removeAllChildNodes(additionalInfo);

    let char = getCharacter();
    planetDetails(char.homeworld);

});

speciesTab.addEventListener('click', function () {

    navSelection(speciesTab);
    
    removeAllChildNodes(additionalInfo);

    let char = getCharacter();
    speciesDescription(char.species);

});

vehiclesTab.addEventListener('click', function () {

    navSelection(vehiclesTab);
    
    removeAllChildNodes(additionalInfo);

    let char = getCharacter();
    vehicleDescription(char.vehicles);

});

starshipsTab.addEventListener('click', function () {

    navSelection(starshipsTab);
    
    removeAllChildNodes(additionalInfo);

    let char = getCharacter();
    starshipsDescription(char.starships);

});


const loader = () => {

    if (ul.innerHTML === '') {
        span = document.createElement('span');
        ul.appendChild(span);
        span.classList.add('loader');
    }

    if (charInfo.innerHTML === '') {
        span = document.createElement('span');
        charInfo.appendChild(span);
        span.classList.add('loader');
    }

    if (additionalInfo.innerHTML === '') {
        span = document.createElement('span');
        additionalInfo.appendChild(span);
        span.classList.add('loader');
    }

}
loader();

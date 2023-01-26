// get id
const idPhotographer = localStorage.getItem('id');


async function getData() {
    //get json
    const response = await fetch('../data/photographers.json', {
        method: 'GET',
        headers: {
            'Accept': 'application/JSON'
        }
    });
    const data = await response.json();

    return data;
}

//create photographer
async function Photographer(data, target) {
    for (let i = 0; i < data.photographers.length; i++) {
        idP = data.photographers[i].id;

        if (idP == idPhotographer) {
            const avatar = `assets/photographers/${data.photographers[i].portrait}`;
            newCreateElement('img', target, { src: avatar });
        }
        else {
            console.log('nn id');
        }
    }
}

//get picture of photographer id => json array media
async function dataAnexPhotographer(data, parent) {
    // let dataPhotographerImg = [];

    for (let x = 0; x < data.media.length; x++) {
        idP = data.media[x].photographerId;

        if (idP == idPhotographer) {
            console.log('yes media');

            //img
            const get = data.media[x]

            //no img get -> get video
            let img;
            if(get.image){
                img = get.image;
            }
            else{
                img = get.video;
            }

            const url = `assets/photographers/${img}`;
            newCreateElement('img', parent[0], { src: url });
            
            //price
            newCreateElement('h3', parent[1], { textContent: get.price });

            //title
            newCreateElement('h1', parent[0], { textContent: get.title, id: "machin" });
        }
        else {
            console.log('nn media');
        }
    }
}

// create element
const newCreateElement = (element, parent, json) => {
    const balise = document.createElement(element);
    // if (src) balise.setAttribute("src", src);
    // if (alt) balise.setAttribute("alt", alt);
    // if (textContent) balise.setAttribute("textContent", textContent);
    Object.entries(json).forEach(([key,value]) => {
        balise.setAttribute(key,value);
    });
    parent.appendChild(balise)
}

//create dom element
async function pageDomPhotographer() {
    const fetchData = await getData();

    //target avatar
    const target = document.querySelector('.photograph-header');

    await Photographer(fetchData, target);

    // target img
    const targetimg = document.querySelector('.photograph-header');

    //target price
    const targetPrice = document.querySelector('.photograph-header');

    await dataAnexPhotographer(fetchData, [targetimg, targetPrice]);
}
pageDomPhotographer();

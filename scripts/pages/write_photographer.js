// get id photographer
const idPhotographer = localStorage.getItem('id');

//het json data
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


/************target******/

//target avatar
const target = document.querySelector('.photograph-header');

// target img
const targetimg = document.querySelector('.photograph-header');

//target price
const targetPrice = document.querySelector('.photograph-header');
//number for get the good photographer name on dataAnexPhotographer function
numberPhoto = [];

//photographer img avatar
async function Photographer(data, target) {
    for (let i = 0; i < data.photographers.length; i++) {
        idP = data.photographers[i].id;


        if (idP == idPhotographer) {
            const avatar = `assets/photographers/${data.photographers[i].portrait}`;
            newCreateElement('img', target, { src: avatar });
            console.log('good photographer id');
            numberPhoto.push(i);
        }
        else {
            console.log('bad photographer id');
        }

    }

}



//get data media of photographer id
async function dataAnexPhotographer(data, parent) {
    // let dataPhotographerImg = [];

    for (let x = 0; x < data.media.length; x++) {
        idP = data.media[x].photographerId;

        if (idP == idPhotographer) {
            //img
            const get = data.media[x]

            //get name generate by regexp
            let nameAll = data.photographers[numberPhoto].name;
            // \s.*$ delete all after ' '   g replace '-' by its ' '
            let nameAlone = nameAll.replace(/\s.*$/, "").replace(/-/g, " ");

            //no img get -> get video
            let img;
            if (get.image) {
                img = get.image;
            }
            else {
                img = get.video;
            }

            const url = `assets/photographers/${nameAlone}/${img}`;
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

// create element with params (url, taget, etc)
const newCreateElement = (element, parent, json) => {
    const balise = document.createElement(element);

    //get other params (src, textContent, etc)
    //with this we can add param easly
    Object.entries(json).forEach(([key, value]) => {
        balise.setAttribute(key, value);
    });
    parent.appendChild(balise)
}

//call function
async function pageDomPhotographer() {
    const fetchData = await getData();
    await Photographer(fetchData, target);
    await dataAnexPhotographer(fetchData, [targetimg, targetPrice]);
}
pageDomPhotographer();



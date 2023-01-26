/*let location = window.location.href;
console.log(window.location);
let id = new URLSearchParams('id');
*/

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

 //get data photographer
async function getdataPhtotographer(data) {
    dataPhotographer = [];

    for (let i = 0; i < data.photographers.length; i++) {
        idP = data.photographers[i].id;

        if (idP == idPhotographer) {
            dataPhotographer.push(data.photographers[i].name);
            dataPhotographer.push(data.photographers[i].portrait);
            dataPhotographer.push(data.photographers[i].price);
            dataPhotographer.push(data.photographers[i].city);
            dataPhotographer.push(data.photographers[i].tagline);
        }
        else {
            console.log('nn id');
        }
    }

    return dataPhotographer
}

//get picture of photographer id => json array media
async function getImgPhotographer(data) {
    dataPhotographerImg = [];

    for (let x = 0; x < data.media.length; x++) {
        idP = data.media[x].photographerId;

        if (idP == idPhotographer) {
            console.log('yes media');
            dataPhotographerImg.push(data.media[x].id);
            dataPhotographerImg.push(data.media[x].photographerId);
            dataPhotographerImg.push(data.media[x].title);
            dataPhotographerImg.push(data.media[x].image);
            dataPhotographerImg.push(data.media[x].likes);
            dataPhotographerImg.push(data.media[x].date);
            dataPhotographerImg.push(data.media[x].price);
        }
        else {
            console.log('nn media');
        }

    }
    return dataPhotographerImg
}


//create dom element
async function pageDomPhotographer() {
    const fetchData = await getData();
    const data = getdataPhtotographer(fetchData);
    console.log('data -----------');
    console.log(data);

    const dataImg = getImgPhotographer(fetchData);
    console.log('img -----------');
    console.log(dataImg);

    const portrait = data[1];
    const imgNumber = dataImg[4];

    //target
    const target = document.querySelector('.photograph-header');

    const boxName = document.createElement('h3');
    boxName.textContent = data[0];

    //box title
    const boxDescription = document.createElement('div');
    const boxLocation = document.createElement('h4');
    boxLocation.textContent = data[4];
    const boxTagline = document.createElement('p');
    boxTagline.textContent = data[5];

    //box avatar
    const avatar = `assets/photographers/${portrait}`;
    const avatarImg = document.createElement('img');
    avatarImg.setAttribute("src", avatar);

    //box img
    const boxSectionImg = document.createElement('section');

    const linkImg = `assets/photographers/${imgNumber}`;
    const img = document.createElement('img');
    img.setAttribute("src", linkImg);




    /*write all balise on article -> .photograph-header*/
    target.appendChild(boxName);
    target.appendChild(avatarImg);
    target.appendChild(boxDescription);
    boxDescription.appendChild(boxLocation);
    boxDescription.appendChild(boxTagline);
}
pageDomPhotographer();

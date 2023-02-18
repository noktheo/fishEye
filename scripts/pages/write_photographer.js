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
const target = document.querySelector('.photographe');

// target img
const targetimg = document.querySelector('.collectionPhotographer');

//target price
const targetPrice = document.querySelector('.collectionPhotographer');

//target follower
const targetFollower = document.querySelector('.compteurFollower');

//target lightbox
const targetLightBox = document.querySelector('body');

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

//compteur
let ab = 0;

let arrayImgPhoto = []

//get data media of photographer id
async function dataAnexPhotographer(data, parent) {



    //number of total of likes
    let totalLikes = 0;
    for (let x = 0; x < data.media.length; x++) {
        idP = data.media[x].photographerId;


        if (idP == idPhotographer) {
            //img
            const get = data.media[x]

            //get name generate by regexp
            let nameAll = data.photographers[numberPhoto].name;
            // \s.*$ delete all after ' '   g replace '-' by its ' '
            let nameAlone = nameAll.replace(/\s.*$/, "").replace(/-/g, " ");

            //box content : img or video + name + follow
            let ParentBoxMedia = document.createElement('article');
            ParentBoxMedia.setAttribute('class', 'ParentBoxMedia');

            let target002 = document.querySelector('.collectionPhotographer');
            target002.appendChild(ParentBoxMedia);

            //box content : img or video
            let contentMedia = document.createElement('div');
            contentMedia.setAttribute('class', 'contentMedia');
            contentMedia.addEventListener('click', openLightbox)

            let target003 = document.getElementsByClassName("ParentBoxMedia")[ab];
            console.log(document.getElementsByClassName("ParentBoxMedia")[ab]);
            target003.appendChild(contentMedia);
            ab++

            //like + likes, etc...
            totalLikes += get.likes;


            //no img -> get video
            let img;
            if (get.image) {
                img = get.image;
                const url = `assets/photographers/${nameAlone}/${img}`;
                newCreateElement('img', contentMedia, { src: url, class: "img" });
                arrayImgPhoto.push(data.media[x].image);
            }
            else {
                img = get.video;
                const url = `assets/photographers/${nameAlone}/${img}`;
                newCreateElement('video', contentMedia, { src: url });
                arrayImgPhoto.push(data.media[x].video);
            }

            //open lightbox
            function openLightbox() {
                console.log("oui oui lightbox");

                //create box content
                newCreateElement('section', parent[3], { class: "boxLightBox" });
                
                let contentMediaLightBox = document.createElement('article');
                contentMediaLightBox.className = "contentMediaLigtBox";
                contentMediaLightBox.addEventListener = ('click', () => { console.log("dadaaaaaaa") } )

                let targetContentMediaLightBox = document.querySelector(".boxLightBox");
                targetContentMediaLightBox.appendChild(contentMediaLightBox);

                //create img / video
                let mediaLightBox = document.createElement('img');
                mediaLightBox.src = `assets/photographers/${nameAlone}/${data.media[x].image}`;
                
                let targetMediaLightBox = document.querySelector(".contentMediaLigtBox");
                targetMediaLightBox.appendChild(mediaLightBox);
            }


            newCreateElement('h3', ParentBoxMedia, { textContent: get.likes });

            //title
            newCreateElement('p', ParentBoxMedia, { textContent: get.title, id: "titleMedia" });
        }
        else {
            console.log('nn media');
        }
    }


    //creat DOM total like
    newCreateElement('p', parent[2], { textContent: totalLikes, class: 'totalFollower' });
}

// create element with params (url, target, etc)
const newCreateElement = (element, parent, json) => {
    const balise = document.createElement(element);

    //get other params (src, textContent, etc)
    //with this we can add param easly
    Object.entries(json).forEach(([key, value]) => {
        if (key === 'textContent') {
            balise.textContent = value;
        }
        else {
            balise.setAttribute(key, value);
        }

    });
    parent.appendChild(balise)
}

//call function
async function pageDomPhotographer() {
    const fetchData = await getData();
    await Photographer(fetchData, target);
    await dataAnexPhotographer(fetchData, [targetimg, targetPrice, targetFollower, targetLightBox]);
}
pageDomPhotographer();

console.log(arrayImgPhoto);

//event click img
const lightboxTrigger = document.querySelectorAll('.img');
const lightbox = document.querySelector('#lightbox');

lightboxTrigger.addEventListener('click', function () {
    const imgSrc = this.getAttribute('src');
    const imgTag = '<img src="' + imgSrc + '">';

    lightbox.innerHTML = imgTag;
    lightbox.style.display = 'block';
});


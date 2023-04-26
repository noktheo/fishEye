/************import function***********/

//function write Element on DOM
import { newCreateElement } from '../utils/createElement.js';

//function get data
import { getData } from '../utils/getData.js';

/************target***********/
//target avatar
const target = document.querySelector('.photographe');

// target img
const targetimg = document.querySelector('.collectionPhotographer');

//target price
const targetPrice = document.querySelector('.collectionPhotographer');

//target follower
const targetFollower = document.querySelector('.compteurFollower');

//target lightbox
const headerBoxInfoP = document.querySelector('#headerInfoP');

//target lightbox
const targetLightBox = document.querySelector('body');

/************value***********/

//number for get the good photographer name on dataAnexPhotographer function
let numberPhoto = [];

//variable event
let sortOrderDate = "ascDate";
let sortOrderLikes = "ascLikes";
let sortOrderTitle = "ascTitle";

//array 1 get data
let allDataPhoto = [];

//array of data filter
let allDataFilter = "";

// get id photographer
const idPhotographer = localStorage.getItem('id');

// id photographer
let idP = '';

/***********************************************/

//send data on fonction
async function pageDomPhotographer() {
    const fetchData = await getData();
    await Photographer(fetchData, target);
    await dataAnexPhotographer(fetchData, [targetimg, targetPrice, targetFollower, targetLightBox]);
}
pageDomPhotographer();

//get data media of photographer id
async function dataAnexPhotographer(data) {
    for (let x = 0; x < data.media.length; x++) {
        idP = data.media[x].photographerId;

        if (idP == idPhotographer) {
            //push array 1 (allDataPhoto)
            allDataPhoto.push(data.media[x]);
        }
        else {
            console.log('nn media');
        }
    }
}

/*******************filter data****************************/
//clone array 1 and sort by .... to array 2
function sortArray(typeSort) {
    //clone
    allDataFilter = allDataPhoto.slice().sort((a, b) => {
        //sort by date
        if (typeSort == 'date') {

            if (sortOrderDate === "ascDate") {
                return new Date(a.date) - new Date(b.date);
            }
            else {
                return new Date(b.date) - new Date(a.date);
            }
        }
        //sort by likes
        else if (typeSort == "likes") {
            if (sortOrderLikes === "ascLikes") {
                return new Date(a.likes) - new Date(b.likes);
            }
            else {
                return new Date(b.likes) - new Date(a.likes);
            }
        }

        //sort by title
        else if (typeSort == "title") {
            if (sortOrderTitle === "ascTitle") {
                return a.title.localeCompare(b.title, undefined, { ignorePunctuation: true, sensitivity: 'base' });
            }
            else {
                return a.title.localeCompare(a.title, undefined, { ignorePunctuation: true, sensitivity: 'base' });
            }
        }

        else {
            console.log('no sort')
        }
    });
    //swap asc / desc
    if (typeSort == 'date') {
        if (sortOrderDate === "asc") {
            sortOrderDate = "desc"; // Inverse l'ordre de tri pour le prochain clic
            console.log('-> croissant date');
        }
        else {
            sortOrderDate = "asc";
            console.log('<- decroissant date');
        }
    }

    if (typeSort == 'likes') {
        if (sortOrderLikes === "ascLikes") {
            sortOrderLikes = "descLikes";
            console.log('-> croissant Like');
        }
        else {
            sortOrderLikes = "ascLikes";
            console.log('-> decroissant Like');
        }
    }

    if (typeSort == 'title') {
        if (sortOrderLikes === "ascTitle") {
            sortOrderLikes = "descTitle";
            console.log('-> croissant Title');
        }
        else {
            sortOrderLikes = "ascTitle";
            console.log('-> decroissant Title');
        }
    }
    return allDataFilter;
}
sortArray();

/*******************EVENT****************************/

const EventSort = document.querySelector("#filterMedia");
EventSort.addEventListener("change", function () {

    if (this.value == "option3") {
        console.log(this.value);
        deleteData();
        sortArray('date');

        writeElementMediaP(allDataFilter);
        console.log(allDataFilter);
    }
    else if (this.value == "option2") {
        console.log(this.value);
        deleteData();
        sortArray('likes');

        writeElementMediaP(allDataFilter);
        console.log(allDataFilter);
    }
    else if (this.value == "option4") {
        console.log(this.value);
        deleteData();
        sortArray('title');

        writeElementMediaP(allDataFilter);
        console.log(allDataFilter);
    }


});

/*******************ARRAY LIKE****************************/

let totalLike = 0;
//get total likes
function arraylikes() {
    //get array of likes
    const arrayLikes = allDataPhoto.map(item => item.likes);

    //make just one number = total likes
    for (let i = 0; i < arrayLikes.length; i++) {
        totalLike = totalLike + arrayLikes[i];
    }
    return totalLike;
}

/*******************to DOM****************************/

//write to dom header
//photographer img avatar header
async function Photographer(data, target) {
    for (let i = 0; i < data.photographers.length; i++) {
        idP = data.photographers[i].id;

        if (idP == idPhotographer) {
            const avatar = `assets/photographers/${data.photographers[i].portrait}`;
            newCreateElement('img', target, { src: avatar });
            numberPhoto.push(i);

            newCreateElement("h1", headerBoxInfoP, { textContent: data.photographers[i].name, class: "nameP" });
            newCreateElement("p", headerBoxInfoP, { textContent: data.photographers[i].country, class: "locationP" });
            newCreateElement("p", headerBoxInfoP, { textContent: data.photographers[i].tagline, class: "descriptionP" });
        }
        else {
            console.log('bad photographer id');
        }



    }
}

//delete all Data picture
function deleteData() {
    console.log('++++++++++++++allDataFilter++++++++++');
    console.log(allDataFilter);
    if (Array.isArray(allDataFilter)) {
        allDataFilter.splice(0, allDataFilter.length);
        const parentBoxes = document.querySelectorAll('.ParentBoxMedia');

        parentBoxes.forEach(box => {
            box.remove();
        });

        console.log("allDataFilter is array")
    } else {
        console.log("allDataFilter is not an array");
    }
}

//write all data picture
async function writeElementMediaP() {
    console.log('++++++++++parent');
    const dataJson = await getData()

    //get data = default array or filter array
    let dataz = "";
    if (!allDataFilter || allDataFilter.length === 0) {
        dataz = allDataPhoto;
    }
    else {
        dataz = allDataFilter;
    }

    //create total like
    newCreateElement('p', targetFollower, { textContent: arraylikes(totalLike), class: 'totalLikes' });
    let compteurTabIndex = 3;
    
    //write multi element
    for (let i = 0; i < dataz.length; i++) {
        

        const getData = dataz[i];
        //get name generate by regexp
        let nameAll = dataJson.photographers[numberPhoto].name;
        // \s.*$ delete all after ' '   g replace '-' by its ' '
        let nameAlone = nameAll.replace(/\s.*$/, "").replace(/-/g, " ");

        //newCreateElement('article', parent[2], { textContent: 'getData.likes', class: "ParentBoxMedia" });
        //box content : img or video + name + follow
        let ParentBoxMedia = document.createElement('article');
        ParentBoxMedia.setAttribute('class', 'ParentBoxMedia');
        ParentBoxMedia.tabIndex = compteurTabIndex;
        let target002 = document.querySelector('.collectionPhotographer');
        target002.appendChild(ParentBoxMedia);

        compteurTabIndex++

        //box content : img or video
        let contentMedia = document.createElement('div');
        contentMedia.setAttribute('class', 'contentMedia');
        contentMedia.addEventListener('click', openLightbox)

        let target003 = document.getElementsByClassName("ParentBoxMedia")[i];
        target003.appendChild(contentMedia);

        //media
        //no img -> get video
        let img;
        if (getData.image) {
            img = getData.image;
            const url = `assets/photographers/${nameAlone}/${img}`;
            newCreateElement('img', contentMedia, { src: url, class: "mediaP" });
        }
        else {
            img = getData.video;
            const url = `assets/photographers/${nameAlone}/${img}`;
            newCreateElement('video', contentMedia, { src: url, class: "mediaP" });
        }

        //box content media info = name media, number likes, icone like
        let boxMediaInfo = document.createElement('div');
        boxMediaInfo.setAttribute('class', 'boxMediaInfo');
        target003.appendChild(boxMediaInfo);

        //title
        newCreateElement('p', boxMediaInfo, { textContent: getData.title, class: "titleMedia" });

        //box likes icon + number
        let boxMediaInfoLikes = document.createElement('div');
        boxMediaInfoLikes.setAttribute('class', 'boxMediaInfoLikes');
        boxMediaInfo.appendChild(boxMediaInfoLikes);

        //total likes
        newCreateElement('p', boxMediaInfoLikes, { textContent: getData.likes, class: "LikesPicture" });


        //icon like
        let iconLikes = document.createElement('div');
        const likesTotal = ParentBoxMedia.querySelector('.LikesPicture');

        //target box totalLikes
        const accountTotal = document.querySelector('.totalLikes');

        iconLikes.setAttribute('class', 'iconLikes');

        iconLikes.addEventListener("click", function () {
            //add -1 -> likesPicture 
            const r = parseInt(likesTotal.textContent) + 1;
            likesTotal.innerHTML = r;

            //add +1 -> likesTotal
            console.log(accountTotal)
            const y = parseInt(accountTotal.textContent) + 1;
            accountTotal.innerHTML = y;
        });
        boxMediaInfoLikes.appendChild(iconLikes);

      

        function closeLightbox() {
            const lightbox = document.querySelector(".boxLightBox");
            lightbox.remove();
        }

        //open lightbox
        function openLightbox() {
            console.log(dataz);
            let compteurMedia = i;
            console.log(compteurMedia);

            //create box content
            newCreateElement('section', targetLightBox, { class: "boxLightBox" });

            //box before media
            let beforeMedia = document.createElement('div');
            beforeMedia.className = "changeMedia arrowReturn";

            let targetContentMediaLightBox = document.querySelector(".boxLightBox");
            targetContentMediaLightBox.appendChild(beforeMedia);
            beforeMedia.addEventListener('click', () => {
                compteurMedia--;
                console.log(compteurMedia);
                if (compteurMedia <= dataz.length) {
                    compteurMedia = 0;
                }

                //remove media
                const element = document.querySelector(".oui");
                element.remove();

                //create img / video
                lightBoxMedia()
            })

            //box img
            let contentMediaLightBox = document.createElement('article');
            contentMediaLightBox.className = "contentMediaLigtBox";
            contentMediaLightBox.addEventListener('click', () => { console.log("dadaaaaaaa") })

            targetContentMediaLightBox.appendChild(contentMediaLightBox);

            //create img / video
            let targetMediaLightBox = document.querySelector(".contentMediaLigtBox");
            function lightBoxMedia() {
                console.log(compteurMedia);

                //icon close


                if (dataz[compteurMedia].image) {
                    let mediaLightBox = document.createElement('img');
                    mediaLightBox.className = "oui";
                    console.log('dataz[compteurMedia]');
                    console.log(dataz[compteurMedia]);
                    mediaLightBox.src = `assets/photographers/${nameAlone}/${dataz[compteurMedia].image}`;
                    console.log(`assets/photographers/${nameAlone}/${dataz[compteurMedia].image}`);

                    let closeIconLightbox = document.createElement('div');
                    closeIconLightbox.className = "closeIconLightbox";
                    targetMediaLightBox.appendChild(closeIconLightbox);

                    targetMediaLightBox.appendChild(mediaLightBox);
                }
                else {
                    let mediaLightBox = document.createElement('video');
                    mediaLightBox.className = "oui";
                    mediaLightBox.src = `assets/photographers/${nameAlone}/${dataz[compteurMedia].video}`;
                    console.log(`assets/photographers/${nameAlone}/${dataz[compteurMedia].video}`);
                    targetMediaLightBox.appendChild(mediaLightBox);
                }
            }
            lightBoxMedia()


            //box before media
            let afterMedia = document.createElement('div');
            afterMedia.className = "changeMedia arrowNext";

            //box event next img (media)
            targetContentMediaLightBox.appendChild(afterMedia);
            afterMedia.addEventListener('click', () => {
                compteurMedia++;
                console.log(compteurMedia);
                if (compteurMedia >= dataz.length) {
                    compteurMedia = 0;
                }

                //remove media
                const element = document.querySelector(".oui");
                element.remove();

                //create img / video
                lightBoxMedia()
            })
        }

    }
}
writeElementMediaP();






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
            numberPhoto.push(i);
        }
        else {
            console.log('bad photographer id');
        }
    }
}


//array 1 get data
let allDataPhoto = [];

//let arrayImgPhoto = []

//get data media of photographer id
async function dataAnexPhotographer(data, parent) {

    console.log('allDataPhoto');
    console.log(allDataPhoto);

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

    let sortOrderDate = "ascDate";
    let sortOrderLikes = "ascLikes";
    let sortOrderTitle = "ascTitle";

    let allDataFilter = "";

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
    }

    /*******************EVENT****************************/
    //date sort
    const EventSortDate = document.querySelector("#filterDate");
    EventSortDate.addEventListener("click", function () {
        deleteData();
        sortArray('date');
        writeArray(allDataFilter);
        console.log(allDataFilter);
    });

    // likes sort
    const EventSortLikes = document.querySelector("#filterLikes");
    EventSortLikes.addEventListener("click", function () {
        deleteData();
        sortArray('likes');
        writeArray(allDataFilter);
        console.log(allDataFilter);
    });

    // title sort
    const EventSortTitle = document.querySelector("#filterTitle");
    EventSortTitle.addEventListener("click", function () {
        deleteData();
        sortArray('title');
        writeArray(allDataFilter);
        console.log(allDataFilter);
    });

    //add like


    /*******************ARRAY LIKE****************************/
    let eventLike = "likeAdd";

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
    function deleteData() {
        if (Array.isArray(allDataFilter)) {
            allDataFilter.splice(0, allDataFilter.length);
            const parentBoxes = document.querySelectorAll('.ParentBoxMedia');

            parentBoxes.forEach(box => {
                box.remove();
            });

            console.log("allDataFilter is array")
        } else {
            console.error("allDataFilter is not an array");
        }
    }

    function writeArray(allDataFilter) {
        for (let i = 0; i < allDataFilter.length; i++) {
            const getData = allDataFilter[i];
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
            contentMedia.addEventListener('click', () => { console.log(getData.image) })

            let target003 = document.getElementsByClassName("ParentBoxMedia")[i];
            target003.appendChild(contentMedia);

            //no img -> get video

            let img;
            if (getData.image) {
                img = getData.image;
                const url = `assets/photographers/${nameAlone}/${img}`;
                newCreateElement('img', contentMedia, { src: url, class: "img" });
            }
            else {
                img = getData.video;
                const url = `assets/photographers/${nameAlone}/${img}`;
                newCreateElement('video', contentMedia, { src: url });
            }

            //total likes
            newCreateElement('h3', ParentBoxMedia, { textContent: getData.likes, id: "totalLikes" });



            let iconLikes = document.createElement('div');
            const likesTotal = ParentBoxMedia.querySelector('#totalLikes');

            const accountTotal = ParentBoxMedia.querySelector('.totalFollower');

            iconLikes.setAttribute('class', 'iconLikes');

            iconLikes.addEventListener("click", function () {
                console.log(accountTotal)
                const y = parseInt(accountTotal.textContent) + 1;
                accountTotal.innerHTML = y;


                const r = parseInt(likesTotal.textContent) + 1;
                likesTotal.innerHTML = r;
                //accountTotal.innerHTML = y;
            });
            target003.appendChild(iconLikes);

            // icon likes
            //newCreateElement('div', ParentBoxMedia, { addEventListenerLikes: "like1", class: "iconLikes" });

            //title
            newCreateElement('p', ParentBoxMedia, { textContent: getData.title, id: "titleMedia" });
        }
    }

    //creat DOM total like
    newCreateElement('p', parent[2], { textContent: arraylikes(totalLike), class: 'totalFollower' });



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
        else if (key === 'addEventListenerLikes') {
            balise.addEventListener("click", function () {
                arraylikes(value);
            });
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
    await dataAnexPhotographer(fetchData, [targetimg, targetPrice, targetFollower]);
}
pageDomPhotographer().then(() => { Table() });

function Table() {

}



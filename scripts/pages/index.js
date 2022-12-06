async function getData() {
    //create data array
    let dataName = [];
    let dataPortrait = [];
    let dataPrice = [];
    let dataCity = [];

    /*array key name -> photographers (json) object*/
    let arrayKey = [];

    /*array id photographers -> photographers (json)*/
    let arrayIdPhoto = [];


    //get json
    const response = await fetch('../data/photographers.json', {
        method: 'GET',
        headers: {
            'Accept': 'application/JSON'
        }
    });
    const data = await response.json();

    //key length
    let keylength = Object.keys(data.photographers[0]).length;
    //push key name on array
    for (let i = 0; i < keylength; i++) {
        arrayKey.push(Object.keys(data.photographers[0])[i]);
    }

    console.log(arrayKey);


    //push data on array
    for (let i = 0; i < data.photographers.length; i++) {

        dataName.push(data.photographers[i].name);
        dataPortrait.push(data.photographers[i].portrait);
        dataPrice.push(data.photographers[i].price);
        dataCity.push(data.photographers[i].city);

        /*
                for (let z = 0; z < arrayKey.length; z++) {
                    let nameKeyTest = arrayKey[z];
        
                dataName.push(data.photographers[i].nameKeyTest);
                console.log(data.photographers[i].nameKeyTest)
                
                }
        */
    }


    
    //get id photographer -> push array
    for (let i = 0; i < data.photographers.length; i++) {
        arrayIdPhoto.push(data.photographers[i].id);
    }
    console.log(arrayIdPhoto );

    //get img of one photographer with id
    let idPhotog = 82;

    for (let i = 0; i < data.media.length; i++) {
        if(data.media[i].photographerId == idPhotog){
            console.log(data.media[i].image + '  --------');
        }
    }

    /*
    const articlesTest = document.querySelector('h2').textContent;
    console.log(articlesTest);
    */


    //return data
    return {
        dataName: dataName,
        dataPortrait: dataPortrait,
        dataPrice: dataPrice,
        dataCity: dataCity
    };
}


async function getPhotographers() {
    const data = await getData();
    console.log(data['dataName'])
    console.log(data['dataPortrait'])
    console.log(data['dataPrice'])

    let photographersList = [];

    //repack data on object
    for (let x = 0; x < 6; x++) {
        let photographers =
        {
            "name": data['dataName'][x],
            "id": 1,
            "city": data['dataCity'][x],
            "country": "France",
            "tagline": "Ceci est ma data test",
            "price": data['dataPrice'][x],
            "portrait": data['dataPortrait'][x]
        }

        //push on array
        photographersList.push(photographers)
        console.log(photographers)
    }
    console.log(photographersList);


    //return data array of all photograpers
    return ({
        photographers: [...photographersList]
    })
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();


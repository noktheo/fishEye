/************import function***********/

//function write Element on DOM
import { photographerFactory } from '../factories/photographer.js';

//function get data
import { getData } from '../utils/getData.js';

/*******************select data and push to factory***************************/

async function displayData() {
    //target
    const photographersSection = document.querySelector(".photographer_section");

    //data
    const fetchData = await getData();

    //data photographers
    for (let i = 0; i < fetchData.photographers.length; i++) {
        //target function and push data
        const photographerModel = photographerFactory(fetchData.photographers[i]);
        //id of photographers data
        const userCardDOM = photographerModel.getUserCardDOM(fetchData.photographers[i].id, i);
        photographersSection.appendChild(userCardDOM);
    };
};
displayData();

// recuperation des elements
let formLogin = document.getElementById('FormLogin');
let userName = document.getElementById('userName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('mail');
//let date = document.getElementById('date');
//let numberT = document.getElementById('numberT');
//let condition = document.getElementById('condition');
//let event0 = document.getElementById('event');
//let tournoi00 = formLogin.elements['Tournoi'];


const nomtableau = new Array();
let y = 0;
let compteur = 0;


// event
formLogin.addEventListener('submit', e => {
    e.preventDefault();
    form_verify();
    console.log(nomtableau)
    if (compteur == 6) {
        console.log('sa roule');
        formLogin.reset();
        openModalValid();
    }

    compteur = 0;
})


// verify
function form_verify() {
    //valeurs inputs
    const userValue = userName.value.trim();
    const lastValue = lastName.value.trim();
    const emailValue = email.value.trim();
    /*const tournoiValue = numberT.value;
    const dateValue = date.value;
    const challenge = tournoi00.value;
    const conditionValue = condition.checked;
    const eventValue = event0.checked;

    console.log(conditionValue);*/

    // Regexp
    const accentedCharacters = "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";
    const emailRegexp = '^[a-z' + accentedCharacters + ']*$';
    const emailLastName = '^[a-zA-Z' + accentedCharacters + ']*$'

    // userName verify
    if (userValue === "") {
        let message = "Prénom ne peut pas être vide";
        setError(userName, message);
    }
    else if (!userValue.match(emailRegexp)) {
        let message = "Prénom doit contenir une lettre";
        setError(userName, message)
    }
    else if (userValue.length < 3) {
        let message = "Prénom doit avoir au moins 3 caractères";
        setError(userName, message)
    }
    else {
        y = 0;
        let value = userValue;
        setSuccess(userName, value, y);
    }


    // lastName verify
    if (lastValue === "") {
        let message = "Nom ne peut pas être vide";
        setError(lastName, message);
    }
    else if (!lastValue.match(emailLastName)) {
        let message = "Nom doit contenir de lettre";
        setError(lastName, message)
    }
    else if (lastValue.length < 3) {
        let message = "Nom doit avoir au moins 3 caractères";
        setError(lastName, message)
    }
    else {
        y = 1;
        let value = lastValue;
        setSuccess(lastName, value, y);
    }


    // email verify
    if (emailValue === "") {
        let message = "Email ne peut pas être vide";
        setError(email, message);
    }
    else if (!emailValue.match(/^[a-z0-9. _%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/i)) {
        let message = "Email non valide";
        setError(email, message);
    }
    else {
        y = 2;
        let value = emailValue;
        setSuccess(email, value, y)
    }
/*
    //date verify
    if (dateValue === '') {
        let message = 'Champ vide';
        setError(date, message);
    }
    else {
        y = 3;
        let value = dateValue;
        setSuccess(date, value, y)
    }

    //number tournoi verify
    let numberTLenght = tournoiValue.length;
    if (numberTLenght >= 4) {
        let message = "abuse pas mec"
        setError(numberT, message);
    }
    else {
        y = 4;
        let value = tournoiValue;
        setSuccess(numberT, value, y)
    }

    //input radio
    if (challenge !== null) {
        y = 5;
        let value = challenge;
        nomtableau[y] = value;
    }

    //condition verify
    if (conditionValue == false) {
        let message = "abuse pas mec"
        setError(condition, message);
        delete nomtableau[6];

    }
    else {
        y = 6;
        let value = conditionValue;
        setSuccess(condition, value, y)
    }

    //condition event
    if (eventValue == false) {
        let message = " "
        setError(event0, message);
        delete nomtableau[7];
    }
    else {
        y = 7;
        let value = eventValue;
        setSuccess(event0, value, y)
    }
    */
}


//error formulaire
function setError(elem, message) {
    const formControl = elem.parentElement;
    const error = formControl.querySelector('span');

    //Ajout de la class alertInput
    elem.classList.add("alertInput");

    // Ajout du message d'erreur
    error.innerText = message
}

//succes formulaire
function setSuccess(elem, value, y) {
    const formControl = elem.parentElement;
    const error = formControl.querySelector('span');

    //suppréssion class alertInput
    elem.classList.remove("alertInput");


    //delete message
    error.innerHTML = '';

    nomtableau[y] = value;

    if (nomtableau[y] == null) {
        console.log()
    }
    else {
        console.log(compteur);
        compteur++
    }


}

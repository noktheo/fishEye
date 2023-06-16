export function photographerFactory(data) {
    const { name, portrait, tagline, city, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM(id, count) {
        //compteur tabindex +1

        /*box photographers*/
        const article = document.createElement('article');
        article.setAttribute('aria-label', "accées a la phototheque de " + name);
        article.tabIndex = 0;

        
        article.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('id', `${id}`);
            window.location = window.location.origin + `/photographer.html?id=${id}`
        });

        /*img*/
        const boxImg = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("aria-label", "portrait de " + name);
        img.setAttribute("alt", "portrait of " + name );
        img.tabIndex = 0;

        /*name*/
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.tabIndex = 0;

        /*city*/
        const pCity = document.createElement('p');
        pCity.textContent = city;
        pCity.tabIndex = 0;
        pCity.className = "locationPhotographer";
        pCity.setAttribute("aria-label", "localiser a" + city);

        /*tagline*/
        const p = document.createElement('p');
        p.textContent = tagline;
        p.tabIndex = 0;
        p.setAttribute("aria-label","description de ma personalité:" + tagline);

        /*price*/
        const pPrice = document.createElement('p');
        pPrice.textContent = price + "€/jour";
        pPrice.tabIndex = 0;
        pPrice.setAttribute("aria-label", "prix a la journée" + price +"€ par jour");
        pPrice.className = "pricePhtoographer";
        

        

        /*write all balise on article -> box photographers*/
        article.appendChild(boxImg);
        boxImg.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCity);
        article.appendChild(p);
        article.appendChild(pPrice);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}
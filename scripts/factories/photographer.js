export function photographerFactory(data) {
    const { name, portrait, tagline, city, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM(id, count) {
        //compteur tabindex +1

        /*box photographers*/
        const article = document.createElement('article');
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
        img.setAttribute("alt", "portrait of " + name );

        /*name*/
        const h2 = document.createElement('h2');
        h2.textContent = name;

        /*city*/
        const pCity = document.createElement('p');
        pCity.textContent = city;
        pCity.className = "locationPhotographer";

        /*tagline*/
        const p = document.createElement('p');
        p.textContent = tagline;

        /*price*/
        const pPrice = document.createElement('p');
        pPrice.textContent = price + "€/jour";
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
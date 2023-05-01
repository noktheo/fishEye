export function photographerFactory(data) {
    const { name, portrait, price, city } = data;

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

        /*price*/
        const p = document.createElement('p');
        p.textContent = price;

        /*city*/
        const pCity = document.createElement('p');
        pCity.textContent = city;

        /*write all balise on article -> box photographers*/
        article.appendChild(boxImg);
        boxImg.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(pCity);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}
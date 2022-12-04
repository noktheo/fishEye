function photographerFactory(data) {
    const { name, portrait, price, city } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const p = document.createElement( 'p' );
        p.textContent = price;

        const pCity = document.createElement( 'p' );
        pCity.textContent = city;

       
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(pCity);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
let beforeMedia = document.querySelector(".arrowReturn");

/****************return*************/
export function lightboxNavigationReturn() {
    beforeMedia.addEventListener('click', () => {
        compteurMedia--;
        console.log(compteurMedia);
        if (compteurMedia < 0) {
            compteurMedia = dataz.length - 1;
        }

        //remove media
        const element = document.querySelector(".pictureLightbox");
        element.remove();

        //remove title
        const elementTitle = document.querySelector(".titleMediaLightbox");
        elementTitle.remove();


        //create img / video
        lightBoxMedia()
    })

    //box before media - event leftkey
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft' || event.keyCode === 37) { // Vérifie si la touche enfoncée est la touche de droite
            compteurMedia--;
            console.log(compteurMedia);
            if (compteurMedia < 0) {
                compteurMedia = dataz.length - 1;
            }

            //remove media
            const element = document.querySelector(".pictureLightbox");
            element.remove();

            //remove title
            const elementTitle = document.querySelector(".titleMediaLightbox");
            elementTitle.remove();


            //create img / video
            lightBoxMedia()

        }
    });
}


/****************next*************/
export function lightboxNavigationNext() {
    //arrow after media - event click
    afterMedia.addEventListener('click', () => {
        compteurMedia++;
        console.log(compteurMedia);
        if (compteurMedia >= dataz.length) {
            compteurMedia = 0;
        }

        //remove media
        const element = document.querySelector(".pictureLightbox");
        element.remove();

        //remove title
        const elementTitle = document.querySelector(".titleMediaLightbox");
        elementTitle.remove();

        //create img / video
        lightBoxMedia()
    })

    //arrow after media - event rightkey
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight' || event.keyCode === 39) { // Vérifie si la touche enfoncée est la touche de droite
            compteurMedia++;
            console.log(compteurMedia);
            if (compteurMedia >= dataz.length) {
                compteurMedia = 0;
            }
            //remove media
            const element = document.querySelector(".pictureLightbox");
            element.remove();

            //remove title
            const elementTitle = document.querySelector(".titleMediaLightbox");
            elementTitle.remove();

            lightBoxMedia()

        }
    });
}
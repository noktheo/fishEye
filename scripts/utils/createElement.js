/*******************function write element to DOM****************************/

// create element with params (url, target, etc)
export const newCreateElement = (element, parent, json) => {
    const balise = document.createElement(element);
    //get other params (src, textContent, etc)
    //with this we can add param easly
    Object.entries(json).forEach(([key, value]) => {
        //param textContent
        if (key === 'textContent') {
            balise.textContent = value;
        }
        //param addEvent
        else if (key === 'addEventListenerLikes') {
            balise.addEventListener("click", function () {
                arraylikes(value);
            });
        }
        //param default
        else {
            balise.setAttribute(key, value);
        }

    });
    //target
    parent.appendChild(balise)

    //console log test 
    //console.log('parent.appendChild')
    //console.log(parent)
}

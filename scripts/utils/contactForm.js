function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "flex";

    const elements = document.querySelectorAll('[tabindex]');

    //priority tabindex modal form
    // Parcourez tous les éléments et désactivez le tabindex
    elements.forEach((element) => {
        element.tabIndex = -1;
    });

    const childrenWithTabIndex = document.querySelectorAll('.boxLightBox [tabindex]');
    childrenWithTabIndex.forEach((element) => {
        element.tabIndex = 0;
    });
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    //reset tabindex
    // Sélectionnez tous les éléments de la page
    const elements = document.querySelectorAll('[tabindex]');

    // Parcourez tous les éléments et supprimez le tabindex
    elements.forEach((element) => {
        element.tabIndex = 0;
    });
}

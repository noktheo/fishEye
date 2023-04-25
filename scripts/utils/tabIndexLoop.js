document.addEventListener('keydown', (event) => {
    if (event.keyCode === 9) { // Vérifier si la touche enfoncée est la touche Tab
      const tabbableElements = document.querySelectorAll('[tabindex="0"], [tabindex]:not([tabindex="-1"])');
      // Sélectionner les éléments avec un attribut tabindex supérieur ou égal à zéro
  
      const firstTabbable = tabbableElements[0];
      const lastTabbable = tabbableElements[tabbableElements.length - 1];
  
      if (event.shiftKey) { // Vérifier si la touche Shift est également enfoncée
        if (document.activeElement === firstTabbable) { // Si le premier élément tabindex est sélectionné
          event.preventDefault(); // Empêcher la sélection d'éléments indésirables
          lastTabbable.focus(); // Sélectionner le dernier élément tabindex
        }
      } else {
        if (document.activeElement === lastTabbable) { // Si le dernier élément tabindex est sélectionné
          event.preventDefault(); // Empêcher la sélection d'éléments indésirables
          firstTabbable.focus(); // Sélectionner le premier élément tabindex
        }
      }
    }
  });
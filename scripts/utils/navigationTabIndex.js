const listItems = document.querySelectorAll('[tabindex]');

listItems.forEach((item) => {
  item.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      item.click();
      console.log("enter for click")
    }
    else{
        console.log("enter for click")
    }
  });
});
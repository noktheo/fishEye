//wait full load page
window.onload = function () {
    function handleClick() {
        console.log("ok img");
      }
    
      const images = document.querySelectorAll("img");
      for (const image of images) {
        image.onclick = handleClick;
      }
};

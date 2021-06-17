let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dots")[0].children;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex].style.display = "block";
  dots[slideIndex].className += " active";

  slideIndex = slideIndex < slides.length - 1 ? slideIndex + 1 : 0;

  setTimeout(showSlides, 4000);
}

document.querySelectorAll("img.svg").forEach(img => {
  let { id, className, src } = img;

  fetch(src)
    .then(response => response.text())
    .then(text => {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(text, "text/xml");

      let svg = xmlDoc.getElementsByTagName("svg")[0];

      if (typeof id !== "undefined") {
        svg.setAttribute("id", id);
      }

      if (typeof className !== "undefined") {
        svg.setAttribute("class", className + " replaced-svg");
      }

      svg.removeAttribute("xmlns:a");

      if (
        !svg.getAttribute("viewBox") &&
        svg.getAttribute("height") &&
        svg.getAttribute("width")
      ) {
        svg.setAttribute(
          "viewBox",
          "0 0 " + svg.getAttribute("height") + " " + svg.getAttribute("width")
        );
      }
      img.parentNode.replaceChild(svg, img);
    });
});

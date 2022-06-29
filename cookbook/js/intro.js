// here we control the intro scene
const introPage = document.querySelector(".intro-page");
const heading = document.querySelector(".heading-primary");
const subtitle = document.querySelector(".subtitle");
const hello = document.querySelector(".hello");

setTimeout(function () {
  hello.classList.toggle("display");
}, 500);
setTimeout(function () {
  hello.classList.toggle("show");
  // add transition for page to fade out after it has appeared, it can be
  // anywhere
  introPage.style.transition = "all .5s ease-in";
  // show rest, of the text, delete hello
  setTimeout(function () {
    // delete hello
    hello.style.transition = "all .2s ease-out";
    hello.classList.toggle("show");

    heading.classList.toggle("display");
  }, 1000);
  setTimeout(function () {
    heading.classList.toggle("show");
  }, 2000);
  setTimeout(function () {
    subtitle.classList.toggle("display");
  }, 2000);
  setTimeout(function () {
    subtitle.classList.toggle("show");
    // after we show subtitle, wait 5 seconds until we move to 3.js scene
    // subtitle.style.transform = "scale(1.2)";
    setTimeout(function () {
      subtitle.style.transition = "font-size 3s ease-in";
      subtitle.style.fontSize = "5.6rem";
    }, 2000);

    setTimeout(function () {
      introPage.style.opacity = "0";
      setTimeout(function () {
        introPage.style.display = "none";
      }, 500);
    }, 5000);
  }, 4000);
}, 1000);

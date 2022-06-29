const pgBtnLeft = document.querySelector(".pg-left");
const pgBtnRight = document.querySelector(".pg-right");

const book = document.querySelector(".book");

let pageSelected = book.querySelector(".page[data-page='0']");
let maxPages = book.children.length - 1;
console.log(maxPages);

pgBtnRight.addEventListener("click", function () {
  // we do not allow the book to be opened when it is cloed on its back side
  if (
    pageSelected.classList.contains("flipped") &&
    pageSelected.nextElementSibling == null
  ) {
    return;
  }

  // flip page

  pageSelected.classList.toggle("flipped");
  pageSelected.style.zIndex = 1;
  // traverse pages only if there exists another page
  if (pageSelected.nextElementSibling != null)
    pageSelected = pageSelected.nextElementSibling;
});

pgBtnLeft.addEventListener("click", function () {
  let pageNum = Number(pageSelected.dataset.page);
  if (pageNum == 0) {
    return;
  }

  console.log(pageNum);

  // closed
  //  if last page is closed, then open it
  if (pageNum == maxPages && pageSelected.classList.contains("flipped")) {
    // open
  } else if (
    //  if last page or any page is opened, then go to prev
    (pageNum == maxPages && !pageSelected.classList.contains("flipped")) ||
    pageSelected.previousElementSibling != null
  ) {
    console.log("open");
    pageSelected = pageSelected.previousElementSibling;
  }

  // position this page on top of last page;
  pageSelected.style.zIndex = 999 - Number(pageSelected.dataset.page);
  pageSelected.classList.toggle("flipped");
});

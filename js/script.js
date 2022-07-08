const pgBtnLeft = document.querySelector(".pg-left");
const pgBtnRight = document.querySelector(".pg-right");

const book = document.querySelector(".book");

let pageSelected = book.querySelector(".page[data-page='0']");
let maxPages = book.children.length - 1;
console.log(maxPages);

// go right
pgBtnRight.addEventListener("click", function () {
  // we do not allow the book to be opened when it is cloed on its back side
  if (
    pageSelected.classList.contains("flipped") &&
    pageSelected.nextElementSibling == null
  ) {
    return;
  }

  // flip page

  console.log(pageSelected);
  pageSelected.classList.toggle("flipped");
  pageSelected.style.zIndex = 999 + Number(pageSelected.dataset.page);

  // traverse pages only if there exists another page
  if (pageSelected.nextElementSibling != null)
    pageSelected = pageSelected.nextElementSibling;
  console.log(pageSelected);
});

// go left
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
    pageSelected.style.zIndex = 999 - Number(pageSelected.dataset.page);
    pageSelected = pageSelected.previousElementSibling;
  }

  // position this page on top of last page;
  pageSelected.classList.toggle("flipped");
});

/* 

.page[data-page="2"] {
  z-index: 1;
}
.page[data-page="1"] {
  z-index: 2;
}
.page[data-page="0"] {
  z-index: 3;
}
*/

console.log(book);

const addZIndex = (nextPage, i) => {
  console.log(nextPage);
  if (nextPage == null) {
    return;
  }

  nextPage.style.zIndex = 999 - Number(nextPage.dataset.page);
  addZIndex(nextPage.nextElementSibling, i + 1);
};

addZIndex(book.children[0], 999);

const recipeImg = document.querySelector(".recipe-img");
console.log(recipeImg);

const traverseImg = (thisPic) => {
  if (thisPic == 3) {
    thisPic = 1;
  }

  let src = `recipeimg/r1${thisPic}.jpg`;
  console.log(src);
  recipeImg.src = src;

  setTimeout(function () {
    traverseImg(thisPic + 1);
  }, 4000);
};

traverseImg(1);

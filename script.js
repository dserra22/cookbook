const tags = {
  protein: { name: "HIGH-PROTEIN", type: "high" },
  inexpensive: { name: "INEXPENSIVE", type: "inexpensive" },
  vegan: { name: "VEGAN", type: "vegan" },
  vegetarian: { name: "VEGETARIAN", type: "vegetarian" },
};
const grocery = {
  chicken: 4,
  greekYogurt: 5,
  garlic: 1,
  onion: 1,
  garamMasala: 5,
  tumeric: 5,
  groundCumin: 5,
  redChiliPowder: 5,
  salt: 5,
  oliveOil: 1,
  ghee: 1,
  ginger: 2,
  groundCoriander: 5,
  crushedTomatoes: 2,
  evaporatedMilk: 2,
  pureCaneSugar: 4,
  kasooriMethi: 5,
  quinoa: 8.5,
  tomato: 1,
  redKidneyBeans: 2,
  blackBeans: 2,
  cheese: 3,
  mustard: 2,
  pickles: 3,
  greenPepper: 1,
  hamburgerBuns: 3.49,
  breadCrumbs: 3,
  eggs: 2.99,
  creamCheese: 2.99,
  ketchup: 2.99,
  Worcestershire: 2.99,
  bayLeaves: 3,
  cayennePepper: 4,
  paprika: 4,
  coconutMilk: 3,
  soySauce: 3,
  sesameSeeds: 4,
  carrot: 2.99,
  eggplant: 1.99,
  parmesean: 3,
  basil: 4,
  noodles: 1.99,
  tofu: 3.49,
  zucchini: 0.99,
};

const pgBtnLeft = document.querySelector(".pg-left");
const pgBtnRight = document.querySelector(".pg-right");

const book = document.querySelector(".book");

let pageSelected = book.querySelector(".page[data-page='0']");

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

  pageSelected.classList.toggle("flipped");
  pageSelected.style.zIndex = 999 + Number(pageSelected.dataset.page);

  // traverse pages only if there exists another page
  if (pageSelected.nextElementSibling != null)
    pageSelected = pageSelected.nextElementSibling;

  // only move rightside of content to front after the page is flipped to keep smooth flipping animation
  setTimeout(function () {
    pageSelected.style.zIndex = 999 + Number(pageSelected.dataset.page);
  }, 200);
});

// go left
pgBtnLeft.addEventListener("click", function () {
  let pageNum = Number(pageSelected.dataset.page);
  if (pageNum == 0) {
    return;
  }

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

const addZIndex = (nextPage, i) => {
  if (nextPage == null) {
    return;
  }

  nextPage.style.zIndex = 999 - Number(nextPage.dataset.page);
  addZIndex(nextPage.nextElementSibling, i + 1);
};

function imageExists(url) {
  return new Promise((resolve) => {
    var img = new Image();
    img.addEventListener("load", () => resolve(true));
    img.addEventListener("error", () => resolve(false));
    img.src = url;
  });
}

const createImgBox = (recipeNum, curURL, box) => {
  if (curURL == -1) {
    return;
  }
  // check if url exists

  let src = `r${recipeNum}${curURL}.jpg`;
  imageExists(src).then((ok) => {
    // console.log(ok);
    // does not exist
    if (!ok) {
      curURL = -1;
    } else {
      // add boxes for each image
      box.insertAdjacentHTML(
        "beforeend",
        `<div class="recipe-img-box--a"></div>`
      );
      createImgBox(recipeNum, curURL + 1, box);
    }
  });
};

const addImagesToImgBox = (recipeNum, curURL, box) => {
  for (const img of box.children) {
    img.style.backgroundImage = `url(r${recipeNum}${curURL}.jpg)`;
    curURL += 1;
  }
};

const traverseImgs = (box, curPic) => {
  setTimeout(function () {
    curPic.classList.toggle("show");

    curPic = curPic.nextElementSibling;

    if (curPic == null) {
      curPic = box.children[0];
    }
    curPic.classList.toggle("show");

    traverseImgs(box, curPic);
  }, 4000);
};

function addImages(box, recipeNum) {
  createImgBox(recipeNum, 1, box);
  setTimeout(function () {
    addImagesToImgBox(recipeNum, 1, box);
    box.children[0].classList.toggle("show");
    traverseImgs(box, box.children[0]);
  }, 1000);
}

// now we make each page. damn holy crap
const recipe = {
  name: "Buterred Chicken",
};

class Recipe {
  constructor(name, tags, instructions, ingredients, subtitles) {
    this.name = name;
    this.tags = tags;
    this.instructions = instructions;
    this.ingredients = ingredients;
    this.subtitles = subtitles;
  }
}

const allRecipes = [];

allRecipes.push(
  new Recipe(
    "Buttered Chicken",
    [tags.protein, tags.inexpensive],
    [
      "Combine the chicken with the chicken marinade ingredients in a bowl. Marinade for 30 minutes to an hour, of course the longer the marrier.",
      "Heat oil until shimmering in a skillet over medium-high heat. Add chicken in batches of two-three, making sure to give the chicken some wiggle room. Fry until browned for 3 minutes on each side. Set aside and keep warm for later",
      "Heat butter or ghee in a pan. Fry onions until they start to caramelize. Make sure to scrape up any bits stuck to the bottom of the pan.",
      "Add garlic and ginger to the pan and saut&#233; for 1 minute until fragrant. Add ground coriander, cumin, and garam masala. Let cook for 20 seconds until fragrant, stirring occassionally.",
      "Add crushed tomatoes, chilli powder, and salt. Let simmer for about 10-15 minutes, stirring occassionally until sauce thickens and becomes a deep brown red colour.",
      "Remove from heat, add mixture into blender, and blend until it becomes a pur&#233;. It is ok to add up to 1/4 cup of water to help blend. Work in batches according to size of blender.",
      "Pour the pur&#233;ed sauce back into the pan. Stir in the cream, sugar and crushed kasoori methi through the sauce. (If you like high-protien, add greek yogurt instead). Add the chicken with juices back into the pan and cook for an additional 8-10 minutes until chicken is cooked through and sauce is thick and bubbling.",
      "Garnish with chopped cilantro and serve fresh with fresh Naan bread",
    ],
    [
      {
        ingredient: "chicken cut into bite-sized pieces",
        amount: "28 oz",
        price: grocery.chicken,
      },
      {
        ingredient: "plain Greek yogurt",
        amount: "1/2 cup",
        price: grocery.greekYogurt,
      },
      {
        ingredient: "minced garlic",
        amount: "1 1/2 tb",
        price: grocery.garlic,
      },
      { ingredient: "minced ginger", amount: "1 tbs", price: grocery.ginger },
      {
        ingredient: "garam masala",
        amount: "2 tss",
        price: grocery.garamMasala,
      },
      { ingredient: "tumeric", amount: "1 tsp", price: grocery.tumeric },
      {
        ingredient: "ground cumin",
        amount: "1 tsp",
        price: grocery.groundCumin,
      },
      {
        ingredient: "red chili powder",
        amount: "1 tsp",
        price: grocery.redChiliPowder,
      },
      { ingredient: "salt", amount: "1 tsp", price: grocery.salt },
      { ingredient: "olive oil", amount: "2 tbs", price: grocery.oliveOil },
      {
        ingredient: "ghee or (1 tbs butter + 1 tbs oil)",
        amount: "2 tb",
        price: "",
      },
      {
        ingredient: "large onion sliced or chopped",
        amount: "1",
        price: grocery.onion,
      },
      {
        ingredient: "minced garlic",
        amount: "1 1/2 tbs",
        price: grocery.garlic,
      },
      { ingredient: "minced ginger", amount: "1 tbs", price: grocery.ginger },
      {
        ingredient: "garam masala",
        amount: "1 1/2 tsp",
        price: grocery.garamMasala,
      },
      {
        ingredient: "ground coriander",
        amount: "1 tsp",
        price: grocery.groundCoriander,
      },
      {
        ingredient: "crushed tomatoes",
        amount: "14 oz",
        price: grocery.crushedTomatoes,
      },
      {
        ingredient: "red chili powder",
        amount: "1 tsp",
        price: grocery.redChiliPowder,
      },
      {
        ingredient: "salt",
        amount: "1 1/4 tsp (or adjust to taste)",
        price: grocery.salt,
      },
      {
        ingredient: "evaporated milk",
        amount: "1 cup",
        price: grocery.evaporatedMilk,
      },
      {
        ingredient:
          "Greek yogurt 1/2 cup (or go crazy and substitute up to 1/2 cup of evaporated milk)",
        amount: "1 cup",
        price: grocery.greekYogurt,
      },
      {
        ingredient: "pure cane sugar",
        amount: "1 tbs",
        price: grocery.pureCaneSugar,
      },
      {
        ingredient: "kasoori methi (or dried fenugreek leaves)",
        amount: "1/2 tsp",
        price: grocery.kasooriMethi,
      },
    ],
    [
      { name: "for the chicken marinade", pos: 0 },
      { name: "for the sauce", pos: 10 },
    ]
  ),
  new Recipe(
    "Carribean Quinoa",
    [tags.protein, tags.inexpensive, tags.vegan],
    [
      "Wash quinoa",
      "Heat saucepan with oil. Add onions, garlic, paprika, thyme, and bay leaves",
      "Add quinoa and stir it for 2 minutes.",
      "Add beans, coconut milk, salt, cayenne pepper and water",
      "Simmer for 20 minutes or until quinoa is 'popped'",
      "Result: really tasty! You are welcome to add avocado, corn, and green peppers. But they will spike up the cost.",
    ],
    [
      {
        ingredient: "quinoa",
        amount: "1.5 cups",
        price: grocery.quinoa,
      },
      {
        ingredient: "tomato",
        amount: "1/4 cup",
        price: grocery.tomato,
      },
      {
        ingredient: "garlic",
        amount: "2 cloves",
        price: grocery.garlic,
      },
      {
        ingredient: "onion (saut&#233;ed)",
        amount: "1/2",
        price: grocery.onion,
      },
      {
        ingredient: "red kidney beans",
        amount: "15.5 oz",
        price: grocery.redKidneyBeans,
      },
      {
        ingredient: "bay leaves",
        amount: "2",
        price: grocery.bayLeaves,
      },
      {
        ingredient: "cayenne pepper",
        amount: "1/4 tsp",
        price: grocery.cayennePepper,
      },
      {
        ingredient: "paprika",
        amount: "1 tsp",
        price: grocery.paprika,
      },
      {
        ingredient: "water",
        amount: "1.5 cups",
        price: 0,
      },
      {
        ingredient: "coconut milk",
        amount: "1 cup",
        price: grocery.coconutMilk,
      },
      {
        ingredient: "cooking oil",
        amount: "2/4 tbs",
        price: grocery.oliveOil,
      },
      {
        ingredient: "thyme",
        amount: "1 tsp",
        price: grocery.paprika,
      },
    ],
    []
  ),
  new Recipe(
    "Black bean burger",
    [tags.protein, tags.inexpensive, tags.vegetarian],
    [
      "Set oven to 325 degrees Farenheit. Add black beans and cook until dried out",
      "Saut&#233;e chopped pepper, garlic, onion for 6 minutes. Blot moisture out with a paper towel. (You want to remove as much moisture as possible for the beans to be solidified)",
      "Place in bowl and add cumin, cayenne, paprika, bread crumbs, cream cheese, eggs, Worcestershire sauce, ketchup, salt (to taste), and black pepper",
      "Stir it all together, and add moisterless black beans after. Leave large chunks of beans, either use a potato masher to mix or blend parts of the mixture to get the consistency you desire",
      "Set oven to 375 degrees Farenheit. Create patties and set on baking sheet.",
      "Add patties to oven and cook 10 minutes on each side, 20 minutes total.",
    ],
    [
      {
        ingredient: "hamburger buns",
        amount: "8",
        price: grocery.hamburgerBuns,
      },
      {
        ingredient: "tomato",
        amount: "1",
        price: grocery.tomato,
      },
      {
        ingredient: "cheese",
        amount: "8 slices",
        price: grocery.cheese,
      },
      {
        ingredient: "mustard",
        amount: "",
        price: grocery.mustard,
      },
      {
        ingredient: "pickles",
        amount: "",
        price: grocery.pickles,
      },
      {
        ingredient: "garlic",
        amount: "1",
        price: grocery.garlic,
      },
      {
        ingredient: "onion",
        amount: "1",
        price: grocery.onion,
      },
      {
        ingredient: "green bell pepper",
        amount: "1",
        price: grocery.greenPepper,
      },
      {
        ingredient: "black beans",
        amount: "1 large can",
        price: grocery.blackBeans,
      },
      {
        ingredient: "bread crumbs",
        amount: "1/2 cup",
        price: grocery.breadCrumbs,
      },
      {
        ingredient: "eggs",
        amount: "2",
        price: grocery.eggs,
      },
      {
        ingredient: "Phili cream cheese (or feta)",
        amount: "1/2 cup",
        price: grocery.creamCheese,
      },
      {
        ingredient: "ketchup",
        amount: "2 tb",
        price: grocery.ketchup,
      },
      {
        ingredient: "Worcestershire sauce",
        amount: "1 tb",
        price: grocery.Worcestershire,
      },
      {
        ingredient: "ground cumin",
        amount: "1.5 tsp",
        price: grocery.groundCumin,
      },
      {
        ingredient: "cayenne pepper",
        amount: "1 tsp",
        price: grocery.cayennePepper,
      },
      {
        ingredient: "paprika",
        amount: "1/4 tsp",
        price: grocery.paprika,
      },
    ],
    []
  ),
  new Recipe(
    "Quinoa tofu stir fry",
    [tags.protein, tags.inexpensive, tags.vegan],
    [
      "Cook quinoa according to package directions. Personally, I cook quinoa just like I do with noodles, and it comes out nicely.",
      "Heat skillet with oil. Once shimmering, add onions, garlic, and green pepper. Let cook until onions start to sweat.",
      "Add carrots, crumpled/block tofu, your choice of beans next. Cook until carrots are mushy. Stir to prevent caking. (You are allowed to add any choice of vegetables, such as broccoli and edamame)",
      "Add quinoa and the rest of ingredients (the rest) except for the sesame seeds. Cook for about 2 minutes more",
      "garnish with sesame seeds",
    ],
    [
      {
        ingredient: "uncooked quinoa",
        amount: "1 cup",
        price: grocery.quinoa,
      },
      {
        ingredient: "onion",
        amount: "1",
        price: grocery.onion,
      },
      {
        ingredient: "bell pepper",
        amount: "1",
        price: grocery.greenPepper,
      },
      {
        ingredient: "carrot",
        amount: "1 large",
        price: grocery.carrot,
      },
      {
        ingredient: "extra-firm tofu",
        amount: "1 packet",
        price: grocery.tofu,
      },
      {
        ingredient: "olive oil",
        amount: "2 tbsp",
        price: grocery.oliveOil,
      },
      {
        ingredient: "garlic",
        amount: "4 cloves",
        price: grocery.garlic,
      },
      {
        ingredient: "sesame seeds",
        amount: "to garnish",
        price: grocery.sesameSeeds,
      },

      {
        ingredient: "cayenne pepper",
        amount: "1/4 tsp",
        price: grocery.cayennePepper,
      },
      {
        ingredient: "minced ginger",
        amount: "1/2 tsp",
        price: grocery.ginger,
      },
      {
        ingredient: "soy sauce or tamari",
        amount: "1 tbsp",
        price: grocery.soySauce,
      },
      {
        ingredient: "pure cane sugar",
        amount: "1 tbsp",
        price: grocery.pureCaneSugar,
      },
    ],
    [{ name: "for the 'rest'", pos: 7 }]
  ),
  new Recipe(
    "Tofu bolognese zoodles",
    [tags.protein, tags.inexpensive, tags.vegan],
    [
      "Add soy sauce, garlic, olive oil, chili powder, and tofu to a bowl, mix, and bake for about 35-45 minutes at 350 degrees Farenheit.",
      "Add any Italian flavor to saucepan: eggplant, bell pper, basil, cheese (if not vegan), caramelized onion, mushroom, thyme, along with the tomato sauce.",
      "Let cook until everything is 'cohesive'",
      "Mix in tofu and let marinate for as long as you can",
      "In large pot, cook fetuccini noodles until al dente, save some pasta water before draining the pot",
      "Add tofu bolognese, fetuccini noodles, and spiralized zucchini to pot and mix together. Add pasta water progressively to bind the sauce together.",
      "Garnish with cheese unless vegan",
      "Notes: make sure to get the proportions right! 40% protein, 40% veggies, and 20% carbs",
    ],
    [
      {
        ingredient: "tomato sauce",
        amount: "2 sauce jars",
        price: grocery.tomatoSauce,
      },
      { ingredient: "bell pepper", amount: "1", price: grocery.greenPepper },
      { ingredient: "eggplant", amount: "1", price: grocery.eggplant },
      { ingredient: "zucchini", amount: "4", price: grocery.zucchini },
      { ingredient: "tofu", amount: "2 packets", price: grocery.tofu },
      { ingredient: "fetuccini", amount: "1/4 packet", price: grocery.noodles },
      { ingredient: "garlic", amount: "1", price: grocery.garlic },
      {
        ingredient: "dried basil crumbles",
        amount: "1/4 tsp",
        price: grocery.basil,
      },
      { ingredient: "soy sauce", amount: "1 tb", price: grocery.soySauce },
      {
        ingredient: "chili powder",
        amount: "2 tsp",
        price: grocery.redChiliPowder,
      },
      {
        ingredient: "parmesean cheese",
        amount: "to garnish",
        price: grocery.parmesean,
      },
      { ingredient: "onion", amount: "1", price: grocery.onion },
    ],
    []
  ),
  new Recipe("Lentil soup with pita and hummus", [], [], [], [])
);

// function decompose(n) {
//   // your code
//   let sqN = Math.pow(n, 2); // 50
//   let sqNums = [];
//   let i = 1;
//   while (sqN != 0) {
//     let num = n - i; // 49, 9
//     let numSq = Math.pow(n - i, 2); // 2401

//     if (sqN - numSq > 0) {
//       // 2500 - 2401, true
//       sqNums.push(num);
//       sqN -= numSq; // 2500 - 2401 = 99
//     } else if (sqN - numSq == 0) {
//       sqN = 0;
//       sqNums.push(num);
//     }

//     i++;
//   }
//   return sqNums;
// }

// console.log(decompose(50));

console.log("lol");

const createPage = (pageNum) => {
  return `<div class="page" data-page="${pageNum}">
  <div class="page-front">  </div> <div class="page-back"> </div> </div>`;
};

const compileFrontSide = (ingredients) => {
  let frontSide = `<div class="front-content">
    ${ingredients}\n <div class="center">
    <div class="recipe-img-box"></div>
  </div>
</div>
  `;

  return frontSide;
};

const compileBackSide = (recipeName, tags, instructions) => {
  let backSide = `
  <div class="back-content">\n
  ${recipeName}\n ${tags} \n
  ${instructions}\n              </div>
  `;

  return backSide;
};
const checkSubtitle = (subtitles, i) => {
  for (const st of subtitles) {
    if (Number(st.pos) == i) {
      return `<h4 class="recipe-subtitle">${st.name}</h4>`;
    }
  }
  return "";
};

const addHTMLtoRecipe = (recipe) => {
  let backSide;
  let frontSide;

  let tags = "";
  let instructions = "";
  let ingredients = "";
  // we add name
  let recipeName = `<h2 class="recipe-title">${recipe.name}</h2>`;
  // we add tags
  for (const tag of recipe.tags) {
    tags += `<div class="tag" data-type="${tag.type}">${tag.name}</div>\n`;
  }
  tags = `<div class="tags">` + tags + "</div>";
  // we add instructions
  for (const instruction of recipe.instructions) {
    instructions += `<li class="instruction">${instruction}</li>\n`;
  }
  instructions =
    `<h3 class="recipe-title-desc">Instructions</h3>
  <ol class="instructions">` +
    instructions +
    "</ol>";

  // we add ingredients
  let i = 0;
  for (const ingredient of recipe.ingredients) {
    let title = checkSubtitle(recipe.subtitles, i);
    ingredients += title;
    ingredients += "\n";
    ingredients += `  <div class="ingredient-title">${ingredient.ingredient}</div>`;
    ingredients += "\n";
    ingredients += `<div class="ingredient-amount">${ingredient.amount}</div>`;
    ingredients += "\n";
    ingredients += ` <div class="ingredient-price">${ingredient.price}</div>`;
    ingredients += "\n";

    i++;
  }
  ingredients =
    `<div class="grid-IAP">\n       
    <h3 class="recipe-title-desc">Ingredient</h3>\n
  <h3 class="recipe-title-desc">Amount</h3>\n
  <h3 class="recipe-title-desc">Price</h3>\n` +
    ingredients +
    ` </div>`;

  // we compile each side
  backSide = compileBackSide(recipeName, tags, instructions);
  frontSide = compileFrontSide(ingredients);

  return backSide + "SPLIT" + frontSide;
};

const addRecipeToPage = (html, recipeNum) => {
  let frontSide = html.split("SPLIT")[0];
  let backSide = html.split("SPLIT")[1];

  for (let i = 0; i < 1; ++i) {
    // access back side
    let backPage = book.children[recipeNum + i].children[1];
    // access front side of next page
    let frontPage = book.children[recipeNum + 1 + i].children[0];

    backPage.insertAdjacentHTML("afterbegin", frontSide);
    frontPage.insertAdjacentHTML("afterbegin", backSide);

    addImages(frontPage.querySelector(".recipe-img-box"), recipeNum);
  }
};
const addRecipesToBook = (allRecipes) => {
  let html = ``;
  let recipeNum = 1;
  // we make recipes+1 pages
  for (let i = 0; i < allRecipes.length + 1; ++i) {
    book.children[book.children.length - 1].insertAdjacentHTML(
      "beforebegin",
      createPage(i + 1)
    );
  }

  // then we add recipes
  for (const recipe of allRecipes) {
    html = addHTMLtoRecipe(recipe);
    addRecipeToPage(html, recipeNum);
    recipeNum++;
  }
};
addRecipesToBook(allRecipes);

let maxPages = book.children.length - 1;
// we change data-page of back cover to last
book.children[book.children.length - 1].dataset.page = maxPages;
addZIndex(book.children[0], 999);

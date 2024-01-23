// Get the recipes container
const recipesContainer = document.getElementById('recipes-container');

// search bar
const searchBar = document.querySelector('.form-control.mr-sm-2');

const formButton = document.querySelector('.btn-outline-success');

// search history local storage on browser 
let localStorageArray = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Spoonacular API key
const apiKey = "96faea5d367c46cca860945a0cac4e30";


// // event listener for when user clicks a recipe picture
//     // API call to Spoonacular which pulls the associated recipe information based on item title
//     recipeImagesContainer.addEventListener('click', function(event) {
//       if (event.target.classList.contains('recipe-image')) {
//           const recipeTitle = event.target.dataset.recipeTitle;
//           getRecipeInformation(recipeTitle);
//       }
//   });


// event listener for user search (on enter key press)
searchBar.addEventListener('keydown', function (event) {
    // check if the enter key is being pressed
    if (event.key === 'Enter') {

        // suppress normal form behaviour
        event.preventDefault();

        // get user input (search query) and store it
        let searchQuery = searchBar.value;

        // check that the entered value isn't blank
        if (searchQuery.trim() === "") {
            alert("Value can't be blank, please enter something to search for!");
            return;
        }

        // call updateSearchHstory & getRecipeInformation function
        getRecipeInformation(searchQuery);
        updateSearchHistory(searchQuery);
    };
});
/*
// button click event
formButton.addEventListener('click', function (e) {

    let searchQuery = searchBar.value;
// check that the entered value isn't blank
    if (searchQuery.trim() === "") {
        alert("Value can't be blank, please enter something to search for!");
        return;
    };
// call updateSearchHstory & getRecipeInformation function
    getRecipeInformation(searchQuery);
    updateSearchHistory(searchQuery);
});*/


// update search history (utilising local storage)
function updateSearchHistory(searchQuery) {
    localStorageArray.push(searchQuery);

    // saving updated search history to localS
    localStorage.setItem('searchHistory', JSON.stringify(localStorageArray));

    // refresh search history
    // loadSearchHistory();
};

// CLASS/ID TO HTML?
// load the search history from local storage

// function loadSearchHistory() {
//     localStorageArray = JSON.parse(localStorage.getItem('searchHistory')) || [];

//     // search history on browser
//     // IF THERE IS A HISTORY _ DO THIS ACTION //// IF SERACH HISTORY LIST IS BLANK _ BREAK////ALWAYS REQUIRE ONE SEARCH HISTORY TERM 
//     const historyList = document.getElementById('search-history-list');
//     console.log(historyList);
//     historyList.innerHTML = "";

//     // localStorageArray.forEach(function (term) {
//     //     const listItem = document.createElement('li');
//     //     listItem.textContent = term;
//     //     historyList.appendChild(listItem);
//     // });

//     // Dropdown 
//     populateDropdown();
// }


// autopopulate dropdown with previous search history which is clickable (makes API calls to Spoonacular)
function populateDropdown() {
    const dropdown = document.getElementById('search-history-dropdown');
    dropdown.innerHTML = "";

    localStorageArray.forEach(function (term) {
        const option = document.createElement('option');
        option.text = term;
        dropdown.add(option);

        // Adding event listener to each option for API call on click
        option.addEventListener('click', function () {
            const selectedTerm = option.text;
            getRecipeInformation(selectedTerm);
        });
    });
}


// API call to Spoonacular which pulls associated recipe information based on user input
function getRecipeInformation(searchQuery) {
    const endpoint = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            // Call a function to display the parsed data on the page
            // displayRecipeInfo(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Spoonacular API fetch operation has failed with the following error:', error);
        });
};


// item name, calories, total weight, diet labels
function populateRecipeInformation() {
    // NEEDS CHANGING TO SEARCH BAR INPUT / LOCAL STORAGE ITEMS
    const searchQuery = "bread";

    const queryURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}`;

    // API fetch call
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        // Pass API results to the displayRecipeInfo function
        .then(function (data) {
            displayRecipeInfo(data.results);
            console.log(data.results);
        })
        .catch(function (error) {
            console.error('API fetch operation has failed with the following error:', error);
        });
};


// Display recipe information on the page
function displayRecipeInfo(recipes) {
    // Loop recipes and dynamically create card elements
    recipes.forEach(function (recipe) {
        // Create the card container
        const cardContainer = document.createElement('div');
        cardContainer.className = 'cardContainer col-lg-3 col-md-3 col-sm-12';

        // Create the card elements
        const card = document.createElement('div');
        card.className = 'card';

        // Create the image elements
        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt = `Image of ${recipe.title}`;
        image.className = 'card-img-top';

        // Create the card body elements
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Create the title elements
        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = recipe.title;

        // Create the button elements
        const button = document.createElement('a');
        button.href = `recipeinfo.html?id=${recipe.id}`;
        button.className = 'btn btn-primary';
        button.target = '_blank';
        button.textContent = 'View recipe details';
        button.dataset.recipeId = recipe.id;

        // Append all elements
        cardBody.appendChild(title);
        cardBody.appendChild(button);

        // Append elements to the card
        card.appendChild(image);
        card.appendChild(cardBody);

        // Append the card to the container
        cardContainer.appendChild(card);

        // Append the card container to the recipes container
        recipesContainer.appendChild(cardContainer);
    });
};

populateRecipeInformation();


// Event listener for when a user clicks to on the 'View recipe details' button
recipesContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-primary')) {
        const recipeId = event.target.dataset.recipeId;

        // Launch recipeinfo.html in a new tab, sending the recipe ID
        window.open(`./assets/html/recipeinfo.html?id=${recipeId}`, '_blank');
    }
});


// event listener for when user selects a checkbox next to recipe ingredient for further nutritional information
// needs to call getNutritionalInformation function
// checkboxesContainer.addEventListener('change', function(event) {
//   if (event.target.type === 'checkbox') {
//       const ingredientName = event.target.dataset.ingredientName;
//       if (event.target.checked) {
//           getNutritionalInformation(ingredientName);
//       }
//   }
// });


// Edamam API call which pulls associated nutritional information for the selected recipe ingredient
// item name, calories, total weight, diet labels
function getNutritionalInformation(ingredient) {

    // API credentials
    const APIkey = "72575860aa8b5e5e5bffa2f910465db4";
    const APPid = "2f21af0b";

    // base URL for API calls
    const queryURL = `https://api.edamam.com/api/nutrition-data?app_id=${APPid}&app_key=${APIkey}&nutrition-type=logging&ingr=${ingredient}`;

    // API fetch call
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Call a function to display the parsed data on the page (NEED TO DECIDE CONTAINER IT DISPLAYS IN)
            //displayProductInfo(data);
            console.log(data);
        })
        .catch(function (error) {
            console.error('API fetch operation has failed with the following error:', error);
        });
};

// successful test call to Edamam API
getNutritionalInformation("bread");
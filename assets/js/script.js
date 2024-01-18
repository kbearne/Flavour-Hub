// global variable - page elements
// search bar
const searchBar = document.querySelector('.form-control');
// recipe images (get recipe title for Spoonacular API call)


// event listener for when user clicks a recipe picture
    // API call to Spoonacular which pulls the associated recipe information based on item title


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

        console.log(searchQuery);

        // call update search history function
        updateSearchHistory(searchQuery);
    };
});


// update search history (utilising local storage)
function updateSearchHistory(searchQuery) {
    localStorageArray.push(searchQuery);

    // saving updated search history to localS
    localStorage.setItem('searchHistory', JSON.stringify(localStorageArray));

    // refresh search history
    loadSearchHistory();
};

// load the search history from local storage
function loadSearchHistory() {
    localStorageArray = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // search history on browser
    const historyList = $('#search-history-list');
    historyList.empty();
    localStorageArray.forEach(function (term) {
        const listItem = $('<li>').text(term);
        historyList.append(listItem);
    });
}


// autopopulate dropdown with previous search history which is clickable (makes API calls to Spoonacular)

// API call to Spoonacular which pulls associated recipe information based on user input


// event listener for when user selects a checkbox next to recipe ingredient for further nutritional information
// needs to call getNutritionalInformation function


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
getNutritionalInformation("egg");
document.addEventListener('DOMContentLoaded', function () {
    // global variable - page elements
    const recipeImagesContainer = document.querySelector('.recipe-images-container');
    const checkboxesContainer = document.querySelector('.checkboxes-container');

    // search bar
    const searchBar = document.querySelector('.form-control');
    // recipe images (get recipe title for Spoonacular API call)

    // search history local storage on browser 
    let localStorageArray = JSON.parse(localStorage.getItem('searchHistory')) || [];
    loadSearchHistory();



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
        const historyList = document.getElementById('search-history-list');
        historyList.innerHTML = "";

        localStorageArray.forEach(function (term) {
            const listItem = document.createElement('li');
            listItem.textContent = term;
            historyList.appendChild(listItem);
        });

        // Dropdown 
        populateDropdown();

    }

    console.log(searchBar);



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
        const apiKey = "c2e2b5d0cebd4e64b88e6bfcaa201518";
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
    }


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
    getNutritionalInformation("egg");

});
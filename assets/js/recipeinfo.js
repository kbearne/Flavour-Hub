// recipe ingredient button
const clickableIngredient = document.querySelector('.clickable-ingredient');

// Get recipe ID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

// API key
const apiKey = "b32514af725f4a3d93e12188f7ffa536";

// Get detailed recipe information using the recipe ID
fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`)
    .then(response => response.json())
    .then(recipeInfo => {
        displayRecipeDetails(recipeInfo);
    })
    .catch(error => {
        console.error('Error fetching recipe details:', error);
    });

// Display detailed recipe information
function displayRecipeDetails(recipeInfo) {
    // Get the recipe-details-container element
    const detailsContainer = document.getElementById('recipe-container');

    // Populate elements with recipe information
    const titleElement = document.getElementById('recipe-title');
    const imageElement = document.getElementById('recipe-image');
    const summaryElement = document.getElementById('recipe-summary');
    const ingredientsListElement = document.getElementById('ingredients-list');
    const stepsListElement = document.getElementById('steps-list');

    // Set content for each element
    titleElement.textContent = recipeInfo.title;
    imageElement.src = recipeInfo.image;
    summaryElement.innerHTML = recipeInfo.summary;

    // Create buttons for each ingredient
    const ingredientsList = recipeInfo.extendedIngredients;
    ingredientsList.forEach(ingredient => {
        const ingredientButton = document.createElement('button');
        ingredientButton.textContent = ingredient.name;
        ingredientButton.classList.add('btn', 'btn-light', 'clickable-ingredient');

        // Add a click event listener to each ingredient button
        ingredientButton.addEventListener('click', () => {
            // Call a function to handle the click and pass the ingredient value
            handleIngredientClick(ingredient.name);
        });

        // Append the ingredient button to the ingredientsListElement
        ingredientsListElement.appendChild(ingredientButton);
    });

    // Populate steps as bullet points
    const steps = recipeInfo.analyzedInstructions[0].steps;
    stepsListElement.innerHTML = steps.map(step => `<li>${step.step}</li>`).join('');
}

function handleIngredientClick(ingredient) {
    // test
    console.log(ingredient);
    getNutritionalInformation(ingredient);
};

// Edamam API call which pulls associated nutritional information for the selected recipe ingredient
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
            // Call a function to display the parsed data on the page
            displayNutritionalInformation(data);
        })
        .catch(function (error) {
            console.error('API fetch operation has failed with the following error:', error);
        });
};

function displayNutritionalInformation(data) {
    // Get the div container to display output
    const nutritionalInfoContainer = document.getElementById('nutritional-info-container');

    // Create a div to display the nutritional information
    const nutritionalInfoDiv = document.createElement('div');
    nutritionalInfoDiv.innerHTML = `
        <h3>${data.ingredients[0].text}</h3>
        <p>Calories: ${data.calories}</p>
        <p>Weight: ${data.totalWeight}</p>
        <p>Diet Labels: ${data.dietLabels.join(', ')}</p>
    `;

    // Append the div to the container and clear any previous content
    nutritionalInfoContainer.innerHTML = '';
    nutritionalInfoContainer.appendChild(nutritionalInfoDiv);
};
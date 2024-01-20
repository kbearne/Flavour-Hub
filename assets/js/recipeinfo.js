// Get recipe ID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

// API key
const apiKey = "c2e2b5d0cebd4e64b88e6bfcaa201518";

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
    const detailsContainer = document.getElementById('recipe-details-container');

    // TO DO - POPULATE ELEMENTS
};
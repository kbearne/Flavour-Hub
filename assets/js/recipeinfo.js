// Get recipe ID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

// API key
const apiKey = "96faea5d367c46cca860945a0cac4e30";

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
    //
};
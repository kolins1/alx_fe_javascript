// Initial array of quotes
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Happiness" },
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Get the quote display area (assuming there's a div with id 'quote-display' in your HTML)
    const quoteDisplay = document.getElementById('quote-display');
    quoteDisplay.innerHTML = ''; // Clear the previous quote

    // Create elements for the quote text and category
    const quoteText = document.createElement('p');
    quoteText.innerText = `"${randomQuote.text}"`;

    const quoteCategory = document.createElement('p');
    quoteCategory.innerText = `- Category: ${randomQuote.category}`;

    // Append elements to the quote display area
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Function to create a form to add new quotes
function createAddQuoteForm() {
    // Get the form container (assuming there's a div with id 'form-container' in your HTML)
    const formContainer = document.getElementById('form-container');
    formContainer.innerHTML = ''; // Clear any existing form

    // Create form elements
    const form = document.createElement('form');

    const quoteLabel = document.createElement('label');
    quoteLabel.innerText = 'Quote: ';
    const quoteInput = document.createElement('input');
    quoteInput.type = 'text';
    quoteInput.id = 'quoteText';
    quoteInput.required = true;

    const categoryLabel = document.createElement('label');
    categoryLabel.innerText = 'Category: ';
    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.id = 'quoteCategory';
    categoryInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Add Quote';

    // Append input fields and button to the form
    form.appendChild(quoteLabel);
    form.appendChild(quoteInput);
    form.appendChild(document.createElement('br')); // Line break
    form.appendChild(categoryLabel);
    form.appendChild(categoryInput);
    form.appendChild(document.createElement('br')); // Line break
    form.appendChild(submitButton);

    // Add form to the container
    formContainer.appendChild(form);

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from refreshing the page

        // Get the values from the input fields
        const newQuoteText = document.getElementById('quoteText').value;
        const newQuoteCategory = document.getElementById('quoteCategory').value;

        // Add the new quote to the array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Clear the form fields
        document.getElementById('quoteText').value = '';
        document.getElementById('quoteCategory').value = '';

        // Show a confirmation message (optional)
        alert('New quote added successfully!');
    });
}

// Call the functions to set up the initial behavior
document.addEventListener('DOMContentLoaded', function () {
    showRandomQuote(); // Display a random quote when the page loads

    // Add button listeners (assuming buttons with these ids exist in your HTML)
    document.getElementById('new-quote-btn').addEventListener('click', showRandomQuote);
    document.getElementById('add-quote-btn').addEventListener('click', createAddQuoteForm);
});

// Initial array of quotes with categories
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Happiness" },
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`; // Using textContent
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        // Add the new quote to the array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Clear input fields after adding
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        // Update the category dropdown dynamically
        populateCategories();

        alert("New quote added!");
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Function to populate categories dropdown
function populateCategories() {
    const categorySelect = document.getElementById('categorySelect');

    // Clear existing options except the "All" option
    categorySelect.innerHTML = '<option value="all">All</option>';

    // Get unique categories
    const categories = [...new Set(quotes.map(quote => quote.category))];

    // Populate dropdown with categories
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category; // Using textContent to add category name safely
        categorySelect.appendChild(option);
    });
}

// Function to filter quotes by category
function categoryFilter() {
    const selectedCategory = document.getElementById('categorySelect').value;
    const quoteDisplay = document.getElementById('quoteDisplay');

    // Filter quotes based on selected category
    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);

    // Display the filtered quotes
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`; // Using textContent
    } else {
        quoteDisplay.textContent = "No quotes available for this category."; // Using textContent
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Show a random quote when the page loads
    showRandomQuote();

    // Populate the categories dropdown
    populateCategories();

    // Show a new random quote when the button is clicked
    document.getElementById('newQuote').addEventListener('click', categoryFilter);

    // Add a new quote when the 'Add Quote' button is clicked
    document.getElementById('addQuoteButton').addEventListener('click', addQuote);

    // Filter quotes by selected category
    document.getElementById('categorySelect').addEventListener('change', categoryFilter);
});

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
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - ${randomQuote.category}</p>`;
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

        alert("New quote added!");
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Show a random quote when the page loads
    showRandomQuote();

    // Show a new random quote when the button is clicked
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);

    // Add a new quote when the 'Add Quote' button is clicked
    document.getElementById('addQuoteButton').addEventListener('click', addQuote);
});

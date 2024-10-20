// Step 2: Array of quote objects (each quote has text and category)
let quotes = [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success usually comes to those who are too busy to be looking for it.", category: "Success" },
];

// Step 2: Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
}

// Step 3: Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        // Add new quote to the quotes array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        
        // Clear the input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        
        alert("Quote added successfully!");
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Step 2: Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuoteButton').addEventListener('click', addQuote);

// Show a random quote on page load
showRandomQuote();

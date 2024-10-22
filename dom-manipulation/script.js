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
// Simulate fetching quotes from server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with your server URL or mock API
        const data = await response.json();

        // Simulating that the server data contains quotes (adapt JSON to fit quote format)
        const serverQuotes = data.map(item => ({ text: item.body, category: "Server" }));

        return serverQuotes;
    } catch (error) {
        console.error("Error fetching data from server:", error);
    }
}
// Merge server and local quotes, resolve conflicts
async function syncQuotes() {
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const serverQuotes = await fetchQuotesFromServer();

    // Conflict Resolution: Server takes precedence in case of duplicates
    const mergedQuotes = [...localQuotes, ...serverQuotes].reduce((acc, current) => {
        const duplicate = acc.find(quote => quote.text === current.text);
        if (!duplicate) {
            acc.push(current);
        }
        return acc;
    }, []);

    // Update local storage with merged quotes
    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));

    // Notify the user about syncing
    alert('Quotes have been synced with the server.');
}

// Periodically sync quotes
setInterval(syncQuotes, 60000); // Sync every 60 seconds
// UI for manual conflict resolution (if needed)
function notifyConflictResolution() {
    const conflictNotification = document.createElement('div');
    conflictNotification.textContent = "A conflict has been resolved with server data.";
    conflictNotification.style.color = "red";
    document.body.appendChild(conflictNotification);

    // Optionally, you can provide buttons to allow users to resolve conflicts manually
}

// Initial array of quotes with categories
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Happiness" },
];
// Find the element
const quoteElement = document.getElementById('quote');

// Set the text content (avoids HTML injection)
quoteElement.textContent = "This is a dynamically generated quote.";
// Function to create a form for adding quotes
function createAddQuoteForm() {
    // Create a form element
    const form = document.createElement('form');
    form.id = 'addQuoteForm';  // Setting an ID for reference

    // Create input field for the quote text
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'quoteInput';
    input.placeholder = 'Enter your quote here...';
    input.required = true;  // Ensures the field is not empty

    // Create a submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Quote';

    // Append input and button to the form
    form.appendChild(input);
    form.appendChild(submitButton);

    // Append the form to the DOM, e.g., to a container div
    const formContainer = document.getElementById('formContainer');
    formContainer.appendChild(form);

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent page reload on submit
        
        // Get the value of the input
        const newQuote = input.value;

        // Call a function to handle adding the new quote
        addQuoteToDOM(newQuote);

        // Clear the input field after submission
        input.value = '';
    });
}

// Function to add the new quote to the DOM (as an example)
function addQuoteToDOM(quote) {
    const quoteContainer = document.getElementById('quoteContainer');
    
    // Create a new paragraph element for the quote
    const newQuoteElement = document.createElement('p');
    newQuoteElement.textContent = quote;

    // Append the new quote to the container
    quoteContainer.appendChild(newQuoteElement);
}

// Call the function to create the form when the page loads
window.onload = function() {
    createAddQuoteForm();
};

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

// Function to simulate sending a new quote to the server
async function postQuoteToServer(newQuote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', { // Replace with your actual server URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuote)
        });

        const data = await response.json();
        console.log('Quote posted to the server:', data);

        // Optionally, notify the user that the quote was successfully posted
        alert("New quote successfully posted to the server!");

        return data;  // Return the server's response for further handling if necessary
    } catch (error) {
        console.error("Error posting data to the server:", error);
    }
}

// Example usage when adding a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };

        // Add the new quote to local storage
        localQuotes.push(newQuote);
        localStorage.setItem('quotes', JSON.stringify(localQuotes));

        // Post the new quote to the server
        postQuoteToServer(newQuote);

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
// Function to sync local and server quotes, with conflict resolution and user notification
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

    // Notify the user that quotes have been synced
    alert('Quotes synced with server!');
}

// Periodically sync quotes (every 60 seconds)
setInterval(syncQuotes, 60000); // Sync every 60 seconds

// Function to simulate fetching quotes from server (same as before)
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Mock API URL
        const data = await response.json();
        const serverQuotes = data.map(item => ({ text: item.body, category: "Server" }));
        return serverQuotes;
    } catch (error) {
        console.error("Error fetching data from server:", error);
        return [];
    }
}
// Sample array of quotes (you can replace this with dynamic data)
// Function to export quotes to a JSON file using Blob
function exportToJson() {
    // Convert quotes array to a JSON string with pretty formatting
    const dataStr = JSON.stringify(quotes, null, 2);

    // Create a new Blob with the JSON data
    const blob = new Blob([dataStr], { type: 'application/json' });

    // Create a URL for the Blob and set it as the href for a download link
    const url = URL.createObjectURL(blob);

    // Create a temporary download link and trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';  // The filename for the download
    downloadLink.click();  // Programmatically click the link to start download

    // Cleanup the URL object after download
    URL.revokeObjectURL(url);
}
// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();

    // Define the onload function for the FileReader
    fileReader.onload = function(e) {
        try {
            // Parse the JSON data from the file
            const importedQuotes = JSON.parse(e.target.result);

            // Validate that the imported data is an array of quotes
            if (Array.isArray(importedQuotes)) {
                // Add the imported quotes to the existing array
                quotes.push(...importedQuotes);

                // Save the updated quotes array to local storage
                saveQuotes();

                // Display the imported quotes in the DOM
                importedQuotes.forEach(quote => addQuoteToDOM(quote));

                alert('Quotes imported successfully!');
            } else {
                alert('Invalid file format. Please upload a JSON file with an array of quotes.');
            }
        } catch (error) {
            alert('Error parsing the file. Please make sure the file is valid JSON.');
        }
    };

    // Read the selected file as text
    fileReader.readAsText(event.target.files[0]);
}

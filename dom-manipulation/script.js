function createAddQuoteForm() {
    // Create the form element
    const form = document.createElement('form');
    form.setAttribute('id', 'addQuoteForm');

    // Create input field for quote text
    const quoteInput = document.createElement('input');
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute('id', 'quoteText');
    quoteInput.setAttribute('name', 'quoteText');
    quoteInput.setAttribute('placeholder', 'Enter your quote here');
    quoteInput.required = true;

    // Create input field for quote category
    const categoryInput = document.createElement('input');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('id', 'quoteCategory');
    categoryInput.setAttribute('name', 'quoteCategory');
    categoryInput.setAttribute('placeholder', 'Enter category');
    categoryInput.required = true;

    // Create a submit button
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Add Quote';

    // Append the inputs and button to the form
    form.appendChild(quoteInput);
    form.appendChild(categoryInput);
    form.appendChild(submitButton);

    // Add the form to the DOM, e.g., inside a specific container
    document.getElementById('formContainer').appendChild(form);

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the form from refreshing the page
        const newQuote = quoteInput.value;
        const newCategory = categoryInput.value;

        if (newQuote && newCategory) {
            // Call a function to handle the new quote and category addition
            addNewQuote(newQuote, newCategory);
        }

        // Clear form inputs
        form.reset();
    });
}

// Function to handle the new quote and category
function addNewQuote(quote, category) {
    // Logic to add the new quote to the system (e.g., pushing it to a quotes array)
    console.log("New quote added:", quote, "Category:", category);
}

// Initialize the form when the page loads
window.onload = function() {
    createAddQuoteForm();
};

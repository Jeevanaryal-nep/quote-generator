const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter'); // tweet button
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQuotes = [];
// Show loading
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading and show quotes
function removerLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// Show new quotes
function newQuote() {
    showLoadingSpinner();
    //  pick a random quote from api array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//  check if Author is empty and replace it with 'Unknown'  

if (!quote.author) {
    authorText.textContent = 'Unknown';
}else {
    authorText.textContent = quote.author;
}
//  check Quote lenght to determine styling
if (quote.length > 120) {
    quoteText.classList.add('long-quote');
}else {
    quoteText.classList.remove('long-quote');
}
// set quote, hide loader
    quoteText.textContent = quote.text;
    removerLoadingSpinner();

}

// Get quotes from the API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        return data;
    } catch (error) {
        console.log(error);
        // catch error and display it
    }
}

//  Tweet quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Add event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

//  final
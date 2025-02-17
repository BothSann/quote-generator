"use strict";

// Select DOM elements
const quoteContainer = document.querySelector(".quote");
const quoteContent = document.querySelector(".quote__content");
const quoteAuthor = document.querySelector(".quote__author--name");
const tweetBtn = document.querySelector(".quote__button--twitter");
const newQuoteBtn = document.querySelector(".quote__button--new");
const loader = document.querySelector(".loader");

// Variable to store API quotess
let apiQuotes = [];

const loading = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const complete = function () {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

// Function to fetch quotes
const getQuotes = async function () {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    alert(err.message);
  }
};

// Function to display a new quote
const newQuote = function () {
  if (apiQuotes.length === 0) return;

  loading();
  const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Handle author
  if (!randomQuote.author) {
    quoteAuthor.textContent = "Unknown Author";
  } else {
    quoteAuthor.textContent = randomQuote.author;
  }

  // Handle quote text
  if (!randomQuote.text) {
    quoteContent.textContent = "Unknown";
  } else {
    quoteContent.textContent = randomQuote.text;
  }

  // Handle class for long quote
  if (randomQuote.text.length > 50) {
    quoteContent.classList.add("quote__content--long");
  } else {
    quoteContent.classList.remove("quote__content--long");
  }
  complete();
};

// Function to tweet the quote
const tweetQuote = function () {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteContent.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterURL, "_blank");
};

// Event Listeners
tweetBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

// On load, fetch quotes
getQuotes();

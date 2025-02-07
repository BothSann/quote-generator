"use strict";
const quoteContent = document.querySelector(".quote__content");
const quoteAuthor = document.querySelector(".quote__author--name");
let apiQuotes = [];

const newQuote = function () {
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
};

const getQuotes = async function () {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    alert(err.message);
  }
};

getQuotes();

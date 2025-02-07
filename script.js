"use strict";

let apiQuotes = [];

const newQuote = function () {
  const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(randomQuote.text);
  console.log(randomQuote.author);
};

const getQuotes = async function () {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    alert(err.Message);
  }
};

getQuotes();

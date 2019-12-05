import React, { useState } from "react";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import SearchBar from "./searcher";
import SearchDisplay from "./display";
import CardDisplay from "./card-display";

import logo from "./logo.svg";
import "./App.css";

// Yes, this is an unsafe way ;)
const TOKEN = "put token here"; // <-- TODO: place your token here TODO: move to env file before publishing

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `token ${TOKEN}`
    }
  }),
  cache: new InMemoryCache()
});

const App = () => {
  let savedCards = JSON.parse(window.sessionStorage.getItem("cards"));
  const [term, setTerm] = useState("");
  const [card, setCard] = useState(savedCards || []);
  const [open, setOpen] = useState(false);

  const createCard = repo => {
    setOpen(false);
    setCard([...card, repo]);
    window.sessionStorage.setItem("cards", JSON.stringify([...card, repo]));
  };

  const deleteCard = index => {
    const newCards = card.filter((item, itemIndex) => {
      return itemIndex !== index;
    });
    setCard(newCards);
    window.sessionStorage.setItem("cards", JSON.stringify(newCards));
  };

  const handleChange = event => {
    let inputTerm = event.target.value;
    setTerm(inputTerm);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to github repository finder</h1>
        </header>
        <p className="App-intro">
          To get started, type in the name of the repo!
        </p>
        <SearchBar handleChange={handleChange} term={term} />
        <SearchDisplay
          term={term}
          createCard={createCard}
          open={open}
          setOpen={setOpen}
        />
        <CardDisplay card={card} deleteCard={deleteCard} />
      </div>
    </ApolloProvider>
  );
};

export default App;

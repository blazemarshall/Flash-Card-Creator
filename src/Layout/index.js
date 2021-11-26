import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";

import Home from "./Home/Home";
import Study from "./Study/Study.js";
import CreateDeck from "./DecksForm/CreateDeck.js";
import Deck from "./Deck.js";
import EditDeck from "./DecksForm/EditDeck.js";
import AddCard from "./Cards/AddCard.js";
import EditCard from "./Cards/EditCard.js";
import NotFound from "./NotFound";

function Layout() {
  const [deckListData, setDeckListData] = useState([]);

  const initialDeckFormData = {
    name: "",
    description: "",
  };

  const [deckFormData, setDeckFormData] = useState({ ...initialDeckFormData });

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home
              deckListData={deckListData}
              setDeckListData={setDeckListData}
            />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <CreateDeck
              deckFormData={deckFormData}
              setDeckFormData={setDeckFormData}
              initialFormData={initialDeckFormData}
            />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck
              deckListData={deckListData}
              setDeckListData={setDeckListData}
            />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck
              deckFormData={deckFormData}
              setDeckFormData={setDeckFormData}
            />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;

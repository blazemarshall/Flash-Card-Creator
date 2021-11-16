import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
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
  // const { toggleFrontOrBack, setToggleFrontOrBack } = useState("false");
  const [deckListData, setDeckListData] = useState([]);

  const [initialDeckFormData, setInitialDeckFormData] = useState({
    name: "",
    description: "",
  });
  const initialCardFormData = { deckId: "", cardId: "", front: "", back: "" };
  const [cardFormData, setCardFormData] = useState({ ...initialCardFormData });
  const [deckFormData, setDeckFormData] = useState({ ...initialDeckFormData });
  console.log("Index,DeckformData", deckFormData);
  return (
    <>
      <Header />
      <div className="container">
        <div>{/*  <Link to="/">Home</Link>*/}</div>
        {/* TODO: Implement the screen starting here 
            //home
            //study
            //createDeck
            //Deck
            //Edit Deck
            //Add Card
            //Edit Card

              */}
        <Switch>
          <Route exact path="/">
            <Home
              deckListData={deckListData}
              setDeckListData={setDeckListData}
              setDeckFormData={setCardFormData}
              initialDeckFormData={initialDeckFormData}
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
    </>
  );
}

export default Layout;

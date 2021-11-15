import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Header from "./common/Header";

import Home from "./Home";
import Study from "./Study/Study.js";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import NotFound from "./NotFound";

function Layout() {
  // const { toggleFrontOrBack, setToggleFrontOrBack } = useState("false");
  const [deckListData, setDeckListData] = useState([]);

  const initialCardFormData = { name: "", description: "" };
  const initialDeckFormData = { deckId: "", cardId: "", front: "", back: "" };
  const [cardFormData, setCardFormData] = useState({ ...initialCardFormData });
  const [deckFormData, setDeckFormData] = useState({ ...initialDeckFormData });
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
            <Deck />
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

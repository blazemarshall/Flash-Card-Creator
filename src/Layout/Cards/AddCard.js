import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";

import { createCard } from "../../utils/api";
import BreadCrumbs from "../common/BreadCrumbs";
import CardForm from "../common/CardForm";
/* 
allows the user to add a new card to an existing deck
   location: /decks/:deckId/cards/new

   The path to this screen should include the deckId
    (i.e., /decks/:deckId/cards/new).
You must use the readDeck() function from src/utils
/api/index.js to load the deck that you're adding
 the card to.
There is a breadcrumb navigation bar with a link to
 home /, followed by the name of the deck to which
  the cards are being added, and finally the text
   Add Card (e.g., Home/React Router/Add Card).
The screen displays the "React Router: Add Card" 
deck title.
A form is shown with the "front" and "back" fields 
for a new card. Both fields use a <textarea> tag
 that can accommodate multiple lines of text.
If the user clicks "Save", a new card is created
 and associated with the relevant deck. Then the
  form is cleared and the process for adding a
   card is restarted.
If the user clicks "Done", the user is taken to
 the Deck screen.
*/
export default function AddCard() {
  const history = useHistory();
  const [deckLoad, setDeckLoad] = useState({});
  const params = useParams();
  const { deckId } = params;
  const initalFormData = { front: "", back: "" };
  const [formDataForAdd, setFormDataForAdd] = useState({ ...initalFormData });
  console.log(typeof deckId, "deckIdtype");

  //-----loads the current deck-------------------------
  useEffect(() => {
    const ac = new AbortController();

    async function loaderDeck() {
      try {
        const response = await readDeck(deckId);
        const deck = await response;
        console.log("loadDeckAsyncFunctUseeffct.deck", deck);
        setDeckLoad(deck);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loaderDeck();
    // setFrontOrBackDescription(loadedDeck.cards[0].back);
    return () => {
      ac.abort();
    };
  }, [deckId]);
  //-------Change and Submit Handlers-------------------------------------
  const changeHandlerForAdd = ({ target }) => {
    setFormDataForAdd({
      ...formDataForAdd,
      [target.name]: target.value,
    });
  };

  const submitHandlerForAdd = (e) => {
    e.preventDefault();

    createCard(deckId, formDataForAdd).then(readDeck(deckId));
    // .then((deck) => setDeckLoad(deck));

    setFormDataForAdd(initalFormData);
    // console.log("formDataForAdd:", formDataForAdd));
  };
  //Component Dependant Variables---------------------------------------
  const deckName = deckLoad.name;
  const componentType = "triple";
  const currentLocation = "Add Card";
  const deckLoc = `/decks/${deckId}`;
  const addCardScreen = true;
  const placeHolder1 = "Front side of card";
  const placeHolder2 = "Back side of card";
  return (
    <div>
      <BreadCrumbs
        componentType={componentType}
        deckId={deckId}
        deckName={deckName}
        currentLocation={currentLocation}
        deckLoc={deckLoc}
      />
      <h1>{deckLoad.name}: Add Card</h1>
      <CardForm
        formDataForAdd={formDataForAdd}
        addCardScreen={addCardScreen}
        changeHandlerForAdd={changeHandlerForAdd}
        submitHandlerForAdd={submitHandlerForAdd}
        placeHolder1={placeHolder1}
        placeHolder2={placeHolder2}
        deckId={deckId}
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

import { createCard } from "../utils/api";
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
  const [formData, setFormData] = useState({ ...initalFormData });
  console.log(typeof deckId, "deckIdtype");
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

  const changeHandler = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    createCard(deckId, formData)
      .then(readDeck(deckId))
      .then((deck) => setDeckLoad(deck));

    setFormData(initalFormData);
    // console.log("formData:", formData));
  };
  // console.log(deckLoad.name, "deckLoad.name");
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/deck/${deckId}`}>{deckLoad.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      {/** must  create form component that is shared between create deck */}
      <h1>{deckLoad.name}: Add Card</h1>
      <form onSubmit={submitHandler}>
        <div class="mb-3">
          <label htmlFor="name" class="form-label">
            Front
          </label>
          <textarea
            name="front"
            type="text"
            rows="2"
            className="form-control"
            id="front"
            placeholder="Front side of card"
            onChange={changeHandler}
            value={formData.front}
          ></textarea>
        </div>
        <div class="mb-3">
          <label htmlFor="description" class="form-label">
            back
          </label>
          <textarea
            name="back"
            placeholder="Back side of card"
            className="form-control"
            id="back"
            rows="2"
            value={formData.back}
            onChange={changeHandler}
          ></textarea>
          <div className="row ">
            <div>
              <Link to={`/decks/${deckId}`} class="btn btn-secondary">
                Done
              </Link>
            </div>
            <div>
              <button type="submit" class="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

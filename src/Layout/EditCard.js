import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
/* allows the user to modify information on an existing card
    Location: /decks/:deckId/cards/:cardId/edit

    The path to this screen should include the deckId and 
    the cardId (i.e., /decks/:deckId/cards/:cardId/edit).
Must use the readDeck() function from src/utils/api/index.js
 to load the deck that contains the card to be 
edited. Additionally, you must use the readCard() function 
from src/utils/api/index.js to load the card that you want to edit.
There is a breadcrumb navigation bar with a link to home
/, followed by the name of the deck of which the edited
 card is a member, and finally the text Edit Card :cardId
  (e.g., Home/Deck React Router/Edit Card 4).
It displays the same form as the Add Card screen, except
 it is pre-filled with information for the existing card.
  It can be edited and updated.
If the user clicks on either "Save" or "Cancel", the user
 is taken to the Deck screen.
*/
export default function EditCard() {
  const history = useHistory();
  const [deckLoad, setDeckLoad] = useState({});
  const params = useParams();
  const { deckId } = params;
  const initalFormData = { front: "", back: "" };
  const [formData, setFormData] = useState({ ...initalFormData });
  const [thisCard, setThisCard] = useState({});
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
    let destination = "";
    // Card(deckId, formData).then(console.log);
    // .then(() => history.push(`/decks/${destination}`));

    console.log("formData:", formData);
  };
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${deckId}`}></Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {/* {location} */}
          </li>
        </ol>
      </nav>
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
              <Link to="/" class="btn btn-secondary">
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

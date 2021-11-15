import React from "react";
import { updateDeck } from "../utils/api";
import DeckForm from "./common/DeckForm";
import { Link, useHistory } from "react-router-dom";

/*
 Location: /decks/:deckId/edit
allows the user to modify information on an existing deck

The path to this screen should include the deckId(i.e.,
     /decks/:deckId/edit).
You must use the readDeck() function from src/utils/api
/index.js to load the existing deck.
There is a breadcrumb navigation bar with a link to home
 /, followed by the name of the deck being edited, and
  finally the text Edit Deck (e.g., Home/Rendering in
     React/Edit Deck).
It displays the same form as the Create Deck screen, 
except it is pre-filled with information for the
 existing deck.
The user can edit and update the form.
If the user clicks "Cancel", the user is taken 
to the Deck screen.
*/
export default function EditDeck({ deckFormData, setDeckFormData }) {
  const history = useHistory();
  const changeHandler = ({ target }) => {
    setDeckFormData({
      ...deckFormData,
      [target.name]: target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let destination = "";
    updateDeck(deckFormData)
      .then((response) => (destination = response.id))
      .then(() => history.push(`/decks/${destination}`));

    console.log("deckFormData:", deckFormData);
  };

  return (
    <div>
      <DeckForm
        deckFormData={deckFormData}
        setDeckFormData={setDeckFormData}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />

      {/* <nav aria-label="breadcrumb">
         <ol class="breadcrumb">
           <li class="breadcrumb-item">
             <Link to="/">Home</Link>
           </li>
           <li class="breadcrumb-item active" aria-current="page">
             Create Deck
           </li>
         </ol>
       </nav>
       <h1>Create Deck</h1>
       <form onSubmit={submitHandler}>
         <div class="mb-3">
           <label htmlFor="name" class="form-label">
             Name
           </label>
           <input
             name="name"
             type="text"
             className="form-control"
             id="name"
             placeholder="Deck Name"
             onChange={changeHandler}
             value={deckFormData.name}
           />
         </div>
         <div class="mb-3">
           <label htmlFor="description" class="form-label">
             Description
           </label>
           <textarea
             name="description"
             placeholder="Brief description of the deck"
             className="form-control"
             id="description"
             rows="3"
             value={deckFormData.description}
             onChange={changeHandler}
           ></textarea>
           <div>
             <Link to="/" class="btn btn-secondary">
               Cancel
             </Link>
             <button type="submit" class="btn btn-primary">
               Submit
             </button>
           </div>
         </div>
       </form> */}
    </div>
  );
}

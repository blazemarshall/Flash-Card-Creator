import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

/* allows the user to create a new deck
    location: /decks/new

The Home screen has a "Create Deck" button that
 brings the user to the Create Deck screen.

 The Create Deck screen has the following features:

The path to this screen should be /decks/new.
There is a breadcrumb navigation bar with a link
 to home / followed by the text Create Deck (i.e., Home/Create Deck).
A form is shown with the appropriate fields for creating a new deck.
The name field is an <input> field of type text.
The description field is a <textarea> field that 
can be multiple lines of text.
If the user clicks "submit", the user is taken to the Deck screen.
If the user clicks "cancel", the user is taken to the Home screen.
*/
export default function CreateDeck(setDeckListdata) {
  const history = useHistory;
  const initalFormData = { name: "", description: "", cards: [], id: "" };
  const [formData, setFormData] = useState({});
  const submitHandler = () => {};
  const changeHandler = ({ target }) => {
    {
      setFormData({ ...formData });
    }
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <form onSubmit={submitHandler}>
        <div class="mb-3">
          <label for="form1" class="form-label">
            Name
          </label>
          <input
            type="email"
            class="form-control"
            id="form1"
            placeholder="Deck Name"
          />
        </div>
        <div class="mb-3">
          <label for="form2" class="form-label">
            Description
          </label>
          <textarea
            placeholder="Brief description of the deck"
            class="form-control"
            id="form2"
            rows="3"
            value=""
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
      </form>
    </div>
  );
}

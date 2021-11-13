import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createDeck } from "../utils/api";
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
export default function CreateDeck() {
  const history = useHistory();

  const initalFormData = { name: "", description: "" };

  const [formData, setFormData] = useState({ ...initalFormData });

  const changeHandler = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let destination = "";
    createDeck(formData)
      .then((response) => (destination = response.id))
      .then(() => history.push(`/decks/${destination}`));

    console.log("formData:", formData);
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
            value={formData.name}
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
            value={formData.description}
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
      </form>
    </div>
  );
}

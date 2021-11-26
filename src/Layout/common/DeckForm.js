import React from "react";
import { Link } from "react-router-dom";

export default function DeckForm({
  createScreen,
  deckFormDataForCreate,
  deckFormDataForEdit,
  changeHandlerForCreate,
  submitHandlerForCreate,
  changeHandlerForEdit,
  submitHandlerForEdit,
}) {
  //-----------Logic to determine actions based on whether its the CreateDeck Screen.
  // let name = "";
  // let description = "";

  // if (createScreen) {
  //   name = deckFormDataForCreate.name;
  //   description = deckFormDataForCreate.description;
  // } else {
  //   name = deckFormDataForEdit.name;
  //   description = deckFormDataForEdit.description;
  // }
  //------------------------------------------------------------------------------------
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {createScreen ? "Create Deck" : "Edit Deck"}
          </li>
        </ol>
      </nav>
      <h1>{createScreen ? "Create Deck" : "Edit Deck"}</h1>
      <form
        onSubmit={createScreen ? submitHandlerForCreate : submitHandlerForEdit}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            placeholder="Deck Name"
            onChange={
              createScreen ? changeHandlerForCreate : changeHandlerForEdit
            }
            value={
              createScreen
                ? deckFormDataForCreate.name
                : deckFormDataForEdit.name
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Brief description of the deck"
            className="form-control"
            id="description"
            rows="3"
            value={
              createScreen
                ? deckFormDataForCreate.description
                : deckFormDataForEdit.description
            }
            onChange={
              createScreen ? changeHandlerForCreate : changeHandlerForEdit
            }
          ></textarea>
          <div>
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

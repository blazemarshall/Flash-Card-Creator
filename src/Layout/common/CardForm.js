import React from "react";
import { Link } from "react-router-dom";

export default function CardForm({
  cardId,
  deckId,
  placeHolder1,
  placeHolder2,

  changeHandlerForAdd,
  changeHandlerForEdit,
  submitHandlerForAdd,
  submitHandlerForEdit,
  addCardScreen,
  formDataForAdd,
  formDataForEdit,
}) {
  let frontValueHandler = addCardScreen
    ? formDataForAdd.front
    : formDataForEdit.front;

  let backValueHandler = addCardScreen
    ? formDataForAdd.back
    : formDataForEdit.back;

  let changeHandler = addCardScreen
    ? changeHandlerForAdd
    : changeHandlerForEdit;

  return (
    <div>
      <form
        onSubmit={addCardScreen ? submitHandlerForAdd : submitHandlerForEdit}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
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
            value={frontValueHandler}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            back
          </label>
          <textarea
            name="back"
            placeholder="Back side of card"
            className="form-control"
            id="back"
            rows="2"
            value={backValueHandler}
            onChange={
              addCardScreen ? changeHandlerForAdd : changeHandlerForEdit
            }
          ></textarea>
          <div className="row ">
            <div>
              <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                Done
              </Link>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function DeckForm({
  changeHandlerForCreate,
  changeHandlerForEdit,
  submitHandlerForCreate,
  submitHandlerForEdit,
  deckFormDataForCreate,
  createScreen,
  setDeckFormData,
  initialDeckFormData,
  setDeckFormDataForEdit,
  deckFormDataForEdit,
}) {
  let changeHandler = createScreen
    ? changeHandlerForCreate
    : changeHandlerForEdit;
  let submitHandler = createScreen
    ? submitHandlerForCreate
    : submitHandlerForEdit;
  let nameValueHandler = createScreen
    ? deckFormDataForCreate.name
    : deckFormDataForEdit.name;
  let descriptionValueHandler = createScreen
    ? deckFormDataForCreate.description
    : deckFormDataForEdit.description;

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
      <form onSubmit={submitHandler}>
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
            onChange={changeHandler}
            value={nameValueHandler}
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
            value={descriptionValueHandler}
            onChange={changeHandler}
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

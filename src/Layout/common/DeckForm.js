import { Link } from "react-router-dom";

export default function DeckForm({
  changeHandler,
  submitHandler,
  deckFormData,
  createScreen,
  setDeckFormData,
}) {
  // if (createScreen) {
  //   setDeckFormData();
  // }
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {createScreen ? "Create Deck" : "Edit Deck"}
          </li>
        </ol>
      </nav>
      <h1>{createScreen ? "Create Deck" : "Edit Deck"}</h1>
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
      </form>
    </div>
  );
}

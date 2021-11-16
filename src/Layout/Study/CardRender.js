import React from "react";
import { Link } from "react-router-dom";

export default function CardRender({
  nextHandler,
  loadedDeckForStudy,
  cards,
  deckId,
  cardNumberDisplay,
  frontOrBackText,
  flipHandler,
  front,
  frontOrBackDescription,
}) {
  return (
    <div>
      <h1>Study:{loadedDeckForStudy.name}</h1>

      <div className="card" style={{ width: "18rem" }}>
        {cards.length <= 2 && cards.length >= 0 ? (
          <div className="card-body">
            <h5 className="card-title">Not enough cards</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {`You need at least 3 cards to study. There are ${cards.length} cards in this deck.`}
            </h6>
            <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="1 1 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>{" "}
              Add Cards
            </Link>
          </div>
        ) : (
          <div className="card-body">
            <h5 className="card-title">{cardNumberDisplay}</h5>

            <h6 className="card-subtitle mb-2 text-muted">{frontOrBackText}</h6>
            <p className="card-text">{frontOrBackDescription}</p>
            <button
              onClick={flipHandler}
              className="card-link btn btn-secondary"
            >
              Flip
            </button>
            {!front ? (
              <button
                onClick={nextHandler}
                className="card-link btn btn-primary"
              >
                Next
              </button>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

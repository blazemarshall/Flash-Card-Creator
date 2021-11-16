import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  readDeck,
  readCard,
  deleteCard,
  deleteDeck,
  listDecks,
} from "../utils/api";
import BreadCrumbs from "./common/BreadCrumbs";

export default function Deck({ setDeckListData, deckListData }) {
  const params = useParams();
  const { deckId, cardId } = params;
  const [deckLoaded, setDeckLoaded] = useState({});
  const [cardsLoaded, setCardsLoaded] = useState();
  const history = useHistory();
  const componentType = "double";

  useEffect(() => {
    const ac = new AbortController();
    // let deck = {};
    async function reloadDeck() {
      try {
        const response = await readDeck(deckId);

        const deck = await response;

        setDeckLoaded(deck);
        setCardsLoaded(deck.cards);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    reloadDeck();

    return () => {
      ac.abort();
    };
  }, [deckId]);

  async function deleteButtonHandler(indexToDelete) {
    if (window.confirm("Do you really want to quash this item?")) {
      window.alert("Oh, you've done, did it now!");
      await deleteDeck(indexToDelete);
      history.push("/");
      // setDeckListData(await listDecks());
    } else {
      window.alert("Thank God!");
    }
  }
  const deleteCardHandler = (thisId) => {
    // console.log(thisId);
    if (window.confirm("Do you really want to quash this item?")) {
      deleteCard(thisId);
      readDeck(deckId).then(history.go(0));
    }
  };

  const deckName = deckLoaded.name;
  return (
    <div style={{ width: "100%" }}>
      <BreadCrumbs
        componentType={componentType}
        deckId={deckId}
        deckName={deckName}
      />
      {/*  */}
      <div key="index" id="deck.id" className=" " style={{ width: "100%" }}>
        {/*---Deck card render---*/}
        <div
          className="card-body"
          // style={{ width: "100%" }}
        >
          <h5 className="card-title">{deckLoaded.name}</h5>
          {/* <h6 className="card-subtitle mb-2 text-muted">CHangeME</h6> */}
          <p className="card-text">{deckLoaded.description}</p>
        </div>
        <div
          className="row d-flex"
          style={
            {
              // width: "100%"
            }
          }
        >
          <div
            className=" d-flex"
            style={{
              // width: "100%"
              margin: "10px",
              justifyContent: "left",
              display: "flex",
            }}
          >
            {/*---Edit---*/}
            <Link
              className="btn btn-secondary"
              to={`/decks/${deckLoaded.id}/edit`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye-fill"
                viewBox="0 1 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
              {" Edit"}
            </Link>
            {/*---Study---*/}
            <Link className="btn btn-primary" to={`/decks/${deckId}/study`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-mortarboard-fill"
                viewBox="1 1 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"
                />
                <path
                  fillRule="evenodd"
                  d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"
                />
              </svg>
              {" Study"}
            </Link>
            {/*------addCard----*/}
            <Link
              className="btn btn-primary "
              to={`/decks/${deckId}/cards/new`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="1 1 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>{" "}
              Add Cards
            </Link>
          </div>

          <div
            className="col-6"
            style={{
              display: "flex",
              justifyContent: "right",
              margin: "10px",
            }}
          >
            <button
              className="btn btn-danger"
              onClick={() => deleteButtonHandler(deckId)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash-fill"
                viewBox="0 1 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2>Cards</h2>
        <ul>
          {/* {console.log(cardsLoaded)} */}
          {cardsLoaded ? (
            cardsLoaded.map((card, index) => (
              <li className="card" key={card.id}>
                <div className="row">
                  <div className="col" style={{ margin: "10px" }}>
                    <h5>Front</h5>
                    {card.front}
                  </div>
                  <div className="col" style={{ margin: "10px" }}>
                    <h5>Back</h5>
                    {card.back}
                  </div>
                </div>
                <div className="row-">
                  <div
                    className="col d-flex "
                    style={{ justifyContent: "right" }}
                  >
                    <Link
                      className="btn btn-secondary"
                      style={{ margin: "5px" }}
                      to={`/decks/${deckId}/cards/${card.id}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCardHandler(card.id)}
                      style={{ margin: "5px" }}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash-fill"
                        viewBox="0 1 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div></div>
          )}
        </ul>
      </div>
    </div>
  );
}

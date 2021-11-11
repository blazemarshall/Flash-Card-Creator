import React, { useEffect, useState } from "react";

import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

export default function Study({ deckListData, setDeckListData }) {
  //-----------hook Variables------------------
  const [front, setFront] = useState(true);
  const [clickNumber, setClickNumber] = useState(1);
  const { deckId } = useParams();
  const [cardNumber, setCardNumber] = useState(0);
  const [loadedDeck, setLoadedDeck] = useState({});

  //-----filters prop decklistData to only selected deck-----
  const currentLoadedDeck = deckListData.filter(
    (currentDeck) => deckId == currentDeck.id
  );

  //------variables-----------------------
  const history = useHistory();
  //original code to dissect card data from api
  // const deck = currentLoadedDeck[0].cards;

  //-------------------------readDeck useEffectHook function -------------------
  useEffect(() => {
    const ac = new AbortController();
    setLoadedDeck({});
    async function loadDeck() {
      try {
        const loadedResponse = await readDeck(deckId);
        const deck = await loadedResponse.json();
        setLoadedDeck(await loadedResponse);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDeck();
    return () => {
      ac.abort();
    };
  }, []);

  // const deck = loadedDeck;
  const cardList = deck.cards;
  console.log("study.cardLIst", loadedDeck);
  // const currentCard = 0;
  // let currentCard = cardList[cardNumber];
  let currentCard = cardList;
  let frontOrBackDescription = null;
  let frontOrBackText = null;

  //---------handles flip button for cards---------

  const flipHandler = () => {
    setFront(!front);
  };
  //---------handles next button for cards----------
  const nextHandler = () => {
    setFront(true);
    //increments cardNumber and clickNumber to advance cards.
    if (cardNumber < deck.length - 1) {
      setCardNumber(cardNumber + 1);
      setClickNumber(clickNumber + 1);
    } else {
      //restarts cardNumber to beginning.
      if (
        window.confirm(
          "Would you like to restart from the beginning? \nClicking Cancel redirects you to the Home screen."
        )
      ) {
        setCardNumber(0);
        setClickNumber(1);
      }
      //redirects you to home screen
      else {
        window.alert("Adios. Heading to the Home screen");
        history.push("/");
      }
    }
  };
  /* checks deck for length  */

  //---------logic for front or back of card---------
  if (front) {
    frontOrBackDescription = loadedDeck.front;
    frontOrBackText = "Front";
  } else {
    frontOrBackDescription = currentCard.back;
    frontOrBackText = "Back";

    //-------render return--------------
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        {/*breadCrumbNav */}
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to="/decks/{currentLoadedDeck[0].id}">{deck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>{" "}
        {/**/}
      </nav>
      <h1>Study:{deck.name}</h1>

      <div class="card" style={{ width: "18rem" }}>
        {deck.length <= 2 ? (
          <div class="card-body">
            <h5 class="card-title">Not enough cards</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              You need at least 3 cards to study. There are {cardList.length}{" "}
              cards in this deck.
            </h6>
            <Link class="btn btn-primary" to={`/decks/${deckId}/cards/new`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="1 1 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>{" "}
              Add Cards
            </Link>
          </div>
        ) : (
          <div class="card-body">
            <h5 class="card-title">
              {clickNumber}
              {" of "}
              {deck.length}
            </h5>

            <h6 class="card-subtitle mb-2 text-muted">{frontOrBackText}</h6>
            <p class="card-text">{frontOrBackDescription}</p>
            <button onClick={flipHandler} class="card-link btn btn-secondary">
              Flip
            </button>
            {!front ? (
              <button onClick={nextHandler} class="card-link btn btn-primary">
                Next
              </button>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </>
  );

  // );
}

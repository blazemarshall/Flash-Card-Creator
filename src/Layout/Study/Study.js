import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
// import ReadDeckComp from "../common/ReadDeckComp";
// import FrontFunction from "./FrontFunction";
// import NextHandler from "./NextHandler";
export default function Study() {
  //-----------hook Variables------------------
  const [front, setFront] = useState(true);
  const [clickNumber, setClickNumber] = useState(1);
  const { deckId } = useParams();
  const [currentCard, setCurrentCard] = useState(0);
  const [loadedDeck, setLoadedDeck] = useState({
    cards: [{ front: "", back: "" }],
  });

  let frontOrBackText = "front";
  //------variables-----------------------
  const history = useHistory();

  //-------------------------readDeck useEffectHook function -------------------
  // <ReadDeckComp deckId={deckId} setLoadedDeck={setLoadedDeck} />;
  useEffect(() => {
    const ac = new AbortController();

    async function loadDeck() {
      try {
        const response = await readDeck(deckId);
        const deck = await response;
        console.log("loadDeckAsyncFunctUseeffct.deck", deck);
        setLoadedDeck(deck);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDeck();
    // setFrontOrBackDescription(loadedDeck.cards[0].back);
    return () => {
      ac.abort();
    };
  }, [deckId]);

  //destructures loadedDeck into card list of card objects and the name of deck.
  const { cards, name } = loadedDeck;

  //without frontOrBack as a variable; the cards do not display the front text on load.
  let frontOrBackDescription = "";
  console.log(front);
  console.log("Front or back Desc", frontOrBackDescription);
  //---------handles flip button for cards---------
  const flipHandler = () => {
    setFront(!front);

    //Tried to componentize without success.
    // FrontFunction(
    //   front,
    //   setFrontOrBackDescription,
    //   setFrontOrBackText,
    //   cards,
    //   currentCard
    // );
    // setFront(!front);
  };

  //---------handles next button for cards----------
  //Tried to componentize without success.
  // <NextHandler
  //   setFront={setFront}
  //   cards={cards}
  //   setCurrentCard={setCurrentCard}
  //   setClickNumber={setClickNumber}
  //   currentCard={currentCard}
  //   clickNumber={clickNumber}
  //   history={history}
  // />;

  const nextHandler = () => {
    setFront(true);
    //increments currentCardNumber and clickNumber to advance cards.
    if (currentCard < cards.length - 1) {
      setCurrentCard(() => currentCard + 1);
      setClickNumber(() => clickNumber + 1);
    } else {
      //restarts currentCardNumber to beginning.
      if (
        window.confirm(
          "Would you like to restart from the beginning? \nClicking Cancel redirects you to the Home screen."
        )
      ) {
        setCurrentCard(0);
        setClickNumber(1);
      }
      //redirects you to home screen
      else {
        window.alert("Adios. Heading to the Home screen");
        history.push("/");
      }
    }
  };
  //---------logic for front or back of card---------
  if (!cards) {
    return null;
  }
  if (front) {
    frontOrBackDescription = cards[currentCard].front;
    frontOrBackText = "Front";
  } else {
    frontOrBackDescription = cards[currentCard].back;
    frontOrBackText = "Back";
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        {/*breadCrumbNav */}
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>{" "}
        {/*breadCrumbNav*/}
      </nav>
      <h1>Study:{loadedDeck.name}</h1>

      <div className="card" style={{ width: "18rem" }}>
        {cards.length <= 2 ? (
          <div className="card-body">
            <h5 className="card-title">Not enough cards</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              You need at least 3 cards to study. There are {cards.length}
              cards in this deck.
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
            <h5 className="card-title">
              {clickNumber}
              {" of "}
              {cards.length}
            </h5>

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
    </>
  );

  // );
}

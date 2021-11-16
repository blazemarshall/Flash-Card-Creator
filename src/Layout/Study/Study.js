import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
import BreadCrumbs from "../common/BreadCrumbs";
import CardRender from "./CardRender";

export default function Study() {
  //-----------hook Variables------------------
  const [front, setFront] = useState(true);
  const [clickNumber, setClickNumber] = useState(1);
  const { deckId } = useParams();
  const [currentCard, setCurrentCard] = useState(0);
  const [loadedDeckForStudy, setLoadedDeckForStudy] = useState({
    cards: [{ front: "", back: "" }],
  });

  let frontOrBackText = "front";
  //------variables-----------------------
  const history = useHistory();

  //-------------------------readDeck useEffectHook function -------------------

  useEffect(() => {
    const ac = new AbortController();

    async function loadDeck() {
      try {
        const response = await readDeck(deckId);
        const deck = await response;
        console.log("loadDeckAsyncFunctUseeffct.deck", deck);
        setLoadedDeckForStudy(deck);
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
  }, [deckId]);

  const { cards, name } = loadedDeckForStudy;

  let frontOrBackDescription = "";
  console.log(front);
  console.log("Front or back Desc", frontOrBackDescription);
  //---------handles flip button for cards---------
  const flipHandler = () => {
    setFront(!front);
  };

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
        // window.alert("Adios. Heading to the Home screen");
        history.push("/");
      }
    }
  };
  //---------logic for front or back of card---------
  if (!cards) {
    return null;
  }
  if (cards.length > 0) {
    if (front) {
      frontOrBackDescription = cards[currentCard].front;
      frontOrBackText = "Front";
    } else {
      frontOrBackDescription = cards[currentCard].back;
      frontOrBackText = "Back";
    }
  }
  const deckName = loadedDeckForStudy.name;
  const componentType = "triple";
  const currentLocation = "Study";
  const deckLoc = `/decks/${deckId}`;
  const cardNumberDisplay = `Card ${clickNumber} of ${cards.length}`;
  return (
    <div>
      <BreadCrumbs
        componentType={componentType}
        deckId={deckId}
        deckName={deckName}
        currentLocation={currentLocation}
        deckLoc={deckLoc}
      />
      <CardRender
        nextHandler={nextHandler}
        loadedDeckForStudy={loadedDeckForStudy}
        cards={cards}
        deckId={deckId}
        cardNumberDisplay={cardNumberDisplay}
        frontOrBackText={frontOrBackText}
        flipHandler={flipHandler}
        front={front}
        frontOrBackDescription={frontOrBackDescription}
      />
    </div>
  );

  // );
}

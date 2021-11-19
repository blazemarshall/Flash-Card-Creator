import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../utils/api";
import BreadCrumbs from "./common/BreadCrumbs";
import DeckRender from "./DecksForm/DeckRender";

export default function Deck() {
  const params = useParams();
  const { deckId } = params;
  const [deckLoaded, setDeckLoaded] = useState({});
  const [cardsLoaded, setCardsLoaded] = useState();
  const history = useHistory();
  const componentType = "double";

  useEffect(() => {
    const ac = new AbortController();

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
    } else {
      window.alert("Thank God!");
    }
  }
  const deleteCardHandler = (thisId) => {
    if (window.confirm("Do you really want to quash this item?")) {
      deleteCard(thisId);
      readDeck(deckId).then(history.go(0));
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <BreadCrumbs
        componentType={componentType}
        deckId={deckId}
        deckName={deckLoaded.name}
      />
      <DeckRender
        deckLoaded={deckLoaded}
        deckId={deckId}
        deleteButtonHandle={deleteButtonHandler}
        cardsLoaded={cardsLoaded}
        deleteCardHandler={deleteCardHandler}
      />
    </div>
  );
}

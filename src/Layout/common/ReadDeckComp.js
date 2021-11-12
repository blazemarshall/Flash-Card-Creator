import React, { useEffect } from "react";
import { readDeck } from "../../utils/api";

export default function ReadDeckComp({ deckId, setLoadedDeck }) {
  useEffect(() => {
    const ac = new AbortController();

    async function loadDeck() {
      try {
        const response = await readDeck(deckId);
        const deck = response;
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
    return () => {
      ac.abort();
    };
  }, [deckId]);
  return <div></div>;
}

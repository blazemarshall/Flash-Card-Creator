import { useState, useEffect } from "react";
import { deleteDeck, listDecks } from "../../utils/api";
import { Link, useHistory } from "react-router-dom";
import HomeDeckRender from "./HomeDeckRender";

export default function Home({
  deckListData,
  setDeckListData,
  initialDeckFormData,
  setDeckFormData,
}) {
  const history = useHistory();

  async function deleteButtonHandler(indexToDelete) {
    //needs to be changed to allow direct manipulation of the api data.
    //currently only deletes from a temporary array.
    if (window.confirm("Do you really want to quash this item?")) {
      window.alert("Oh, you've done, did it now!");
      await deleteDeck(indexToDelete).then(history.push("/"));
      setDeckListData(await listDecks());
    } else {
      window.alert("Thank God!");
    }
  }
  useEffect(() => {
    const ac = new AbortController();
    async function loadDecks() {
      try {
        const listDecksResponse = await listDecks();
        setDeckListData(listDecksResponse);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDecks();
    return () => {
      // console.log("cleanup");
      ac.abort();
    };
  }, []);
  // console.log("Home-ln49-deckListdata:", deckListData);
  const createButtonHandler = () => {
    history.push("/decks/new");
    setDeckFormData(initialDeckFormData);
  };
  return (
    <div>
      <HomeDeckRender
        deleteButtonHandler={deleteButtonHandler}
        createButtonHandler={createButtonHandler}
        deckListData={deckListData}
      />
    </div>
  );
}

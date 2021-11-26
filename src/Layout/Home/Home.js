import React from "react";
import { useEffect } from "react";
import { deleteDeck, listDecks } from "../../utils/api";
import { useHistory } from "react-router-dom";
import HomeDeckRender from "./HomeDeckRender";

export default function Home({
  deckListData,
  setDeckListData,
  setDeckFormData,
}) {
  const history = useHistory();
  // const initialDeckFormData = {
  //   name: "",
  //   description: "",
  // };

  async function deleteButtonHandler(indexToDelete) {
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
      ac.abort();
    };
  }, []);

  const createButtonHandler = () => {
    history.push("/decks/new");
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

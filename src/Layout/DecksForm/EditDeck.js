import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../../utils/api";
import DeckForm from "../common/DeckForm";
import { useHistory, useParams } from "react-router-dom";

export default function EditDeck() {
  const [deckFormDataForEdit, setDeckFormDataForEdit] = useState({});
  const history = useHistory();
  const { deckId } = useParams();
  const createScreen = false;

  const changeHandlerForEdit = ({ target }) => {
    setDeckFormDataForEdit({
      ...deckFormDataForEdit,
      [target.name]: target.value,
    });
  };

  const submitHandlerForEdit = (e) => {
    e.preventDefault();
    let destination = "";
    updateDeck(deckFormDataForEdit)
      .then((response) => (destination = response.id))
      .then(() => history.push(`/decks/${destination}`));
  };
  useEffect(() => {
    const ac = new AbortController();

    async function loadDeck() {
      try {
        const response = await readDeck(deckId);
        const deck = response;

        setDeckFormDataForEdit(deck);
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
  return (
    <div>
      <DeckForm
        changeHandlerForEdit={changeHandlerForEdit}
        submitHandlerForEdit={submitHandlerForEdit}
        createScreen={createScreen}
        descriptionValue={deckFormDataForEdit}
        nameValue={deckFormDataForEdit}
        deckFormDataForEdit={deckFormDataForEdit}
        setDeckFormDataForEdit={setDeckFormDataForEdit}
      />
    </div>
  );
}

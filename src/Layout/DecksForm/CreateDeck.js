import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import DeckForm from "../common/DeckForm";

export default function CreateDeck() {
  //--------------------------------------------------------------------------------
  const initialDeckFormDataForCreate = {
    name: "",
    description: "",
  };
  const [deckFormDataForCreate, setDeckFormDataForCreate] = useState(
    initialDeckFormDataForCreate
  );
  const history = useHistory();
  const createScreen = true;

  //-----------------Change and Submit Handlers-------------------------------------
  const changeHandlerForCreate = ({ target }) => {
    setDeckFormDataForCreate({
      ...deckFormDataForCreate,
      [target.name]: target.value,
    });
  };

  const submitHandlerForCreate = (e) => {
    e.preventDefault();
    let destination = "";
    createDeck(deckFormDataForCreate)
      .then((response) => (destination = response.id))
      .then(() => history.push(`/decks/${destination}`));

    // console.log("formData:", deckFormDataForCreate);
  };
  //--------------------------------------------------------------------------------
  return (
    <div>
      <DeckForm
        createScreen={createScreen}
        deckFormDataForCreate={deckFormDataForCreate}
        setDeckFormDataForCreate={setDeckFormDataForCreate}
        initialDeckFormDataForCreate={initialDeckFormDataForCreate}
        changeHandlerForCreate={changeHandlerForCreate}
        submitHandlerForCreate={submitHandlerForCreate}
      />
    </div>
  );
}

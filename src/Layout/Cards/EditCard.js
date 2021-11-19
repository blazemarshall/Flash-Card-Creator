import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import BreadCrumbs from "../common/BreadCrumbs";
import CardForm from "../common/CardForm";

export default function EditCard() {
  const history = useHistory();
  const [deckLoad, setDeckLoad] = useState({});
  const params = useParams();
  const { deckId, cardId } = params;
  const initialFormData = {
    front: "",
    back: "",
  };
  const [formDataForEdit, setFormDataForEdit] = useState({
    ...initialFormData,
  });
  //--------------loads the current deck------------------------------------
  useEffect(() => {
    const ac = new AbortController();

    async function loaderDeck() {
      try {
        const response = await readDeck(deckId);
        const deck = response;
        const cardResponse = await readCard(cardId);
        const card = cardResponse;

        setDeckLoad(deck);
        setFormDataForEdit({
          front: card.front,
          back: card.back,
          id: card.id,
          deckId: card.deckId,
        });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loaderDeck();

    return () => {
      ac.abort();
    };
  }, [deckId, cardId]);

  //-------Change and Submit Handlers-------------------------------------
  const changeHandlerForEdit = ({ target }) => {
    setFormDataForEdit({
      ...formDataForEdit,
      [target.name]: target.value,
    });
  };

  const submitHandlerForEdit = (e) => {
    e.preventDefault();
    updateCard(formDataForEdit).then(() => history.push(`/decks/${deckId}`));
  };

  //------Component Dependant Variables--------------------------------
  const deckName = deckLoad.name;
  const componentType = "triple";
  const currentLocation = `Edit Card: ${cardId}`;
  const deckLoc = `/decks/${deckId}`;
  const addCardScreen = false;

  return (
    <div>
      <BreadCrumbs
        componentType={componentType}
        deckId={deckId}
        deckName={deckName}
        currentLocation={currentLocation}
        deckLoc={deckLoc}
      />
      <h1>
        {deckLoad.name}: Edit Card: {cardId}
      </h1>
      <CardForm
        formDataForEdit={formDataForEdit}
        addCardScreen={addCardScreen}
        changeHandlerForEdit={changeHandlerForEdit}
        submitHandlerForEdit={submitHandlerForEdit}
        deckId={deckId}
      />
    </div>
  );
}

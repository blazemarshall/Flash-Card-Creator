import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { readDeck } from "../../utils/api";

import { createCard } from "../../utils/api";
import BreadCrumbs from "../common/BreadCrumbs";
import CardForm from "../common/CardForm";

export default function AddCard() {
  const [deckLoad, setDeckLoad] = useState({});
  const params = useParams();
  const { deckId } = params;
  const initalFormData = { front: "", back: "" };
  const [formDataForAdd, setFormDataForAdd] = useState({ ...initalFormData });

  //-----loads the current deck-------------------------
  useEffect(() => {
    const ac = new AbortController();

    async function loaderDeck() {
      try {
        const response = await readDeck(deckId);
        const deck = await response;

        setDeckLoad(deck);
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
  }, [deckId]);
  //-------Change and Submit Handlers-------------------------------------
  const changeHandlerForAdd = ({ target }) => {
    setFormDataForAdd({
      ...formDataForAdd,
      [target.name]: target.value,
    });
  };

  const submitHandlerForAdd = (e) => {
    e.preventDefault();
    createCard(deckId, formDataForAdd).then(readDeck(deckId));
    setFormDataForAdd(initalFormData);
  };
  //Component Dependant Variables---------------------------------------
  const deckName = deckLoad.name;
  const componentType = "triple";
  const currentLocation = "Add Card";
  const deckLoc = `/decks/${deckId}`;
  const addCardScreen = true;
  const placeHolder1 = "Front side of card";
  const placeHolder2 = "Back side of card";
  return (
    <div>
      <BreadCrumbs
        componentType={componentType}
        deckId={deckId}
        deckName={deckName}
        currentLocation={currentLocation}
        deckLoc={deckLoc}
      />
      <h1>{deckLoad.name}: Add Card</h1>
      <CardForm
        formDataForAdd={formDataForAdd}
        addCardScreen={addCardScreen}
        changeHandlerForAdd={changeHandlerForAdd}
        submitHandlerForAdd={submitHandlerForAdd}
        placeHolder1={placeHolder1}
        placeHolder2={placeHolder2}
        deckId={deckId}
      />
    </div>
  );
}

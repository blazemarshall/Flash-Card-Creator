import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
/* allows the user to study the cards from a specified deck
     location: /decks/:deckId/study

The path to this screen should include the deckId (i.e., /decks/:deckId/study).
You must use the readDeck() function from src/utils/api/index.js to load the 
deck that is being studied.
There is a breadcrumb navigation bar with links to home /, followed by the name
 of the deck being studied and finally the text Study (e.g., Home/Rendering In 
    React/Study).
The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.
Cards are shown one at a time, front-side first.
A button at the bottom of each card "flips" it to the other side.
After flipping the card, the screen shows a next button (see the "Next button" 
section below) to continue to the next card.
After the final card in the deck has been shown, a message (see the "Restart 
prompt" section below) is shown offering the user the opportunity to restart
 the deck.
If the user does not restart the deck, they should return to the home screen.
Studying a deck with two or fewer cards should display a "Not enough cards" 
message (see the "Not enough cards" section below) and a button to add cards 
to the deck.
The next button appears after the card is flipped.
When all cards are finished, a message is shown and
 the user is offered the opportunity to restart the
  deck. If the user does not restart the deck, they 
  return to the home screen.

You can use window.confirm() to create the modal
 dialog shown in the screenshot below.
Studying a Deck with two or fewer cards should display
 a "Not enough cards" message and a button to add cards
  to the deck.

  Clicking the "Add Cards" button should take the user 
  to the Add Card screen.


//breadcrumbs component


*/

export default function Study({ deckListData, setDeckListData }) {
  //-----------hook Variables------------------
  const [front, setFront] = useState(true);
  const [clickNumber, setClickNumber] = useState(1);
  const { deckId } = useParams();
  const [cardNumber, setCardNumber] = useState(0);

  //-----filters prop decklistData to only selected deck-----
  const currentLoadedDeck = deckListData.filter(
    (currentDeck) => deckId == currentDeck.id
  );

  //------variables-----------------------
  const cardList = currentLoadedDeck[0].cards;
  let currentCard = cardList[cardNumber];
  let frontOrBackDescription = null;
  let frontOrBackText = null;

  //---------handles flip button for cards---------

  const flipHandler = () => {
    setFront(!front);
  };
  //---------handles next button for cards----------
  const nextHandler = () => {
    setFront(true);

    if (cardNumber < cardList.length - 1) {
      setCardNumber(cardNumber + 1);
      setClickNumber(clickNumber + 1);
    } else {
      setCardNumber(0);
      setClickNumber(1);
    }
  };
  //---------logic for front or back of card---------
  if (front) {
    frontOrBackDescription = currentCard.front;
    frontOrBackText = "Front";
  } else {
    frontOrBackDescription = currentCard.back;
    frontOrBackText = "Back";

    //-------render return--------------
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        {/*breadCrumbNav */}
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to="/decks/{currentLoadedDeck[0].id}">{`${currentLoadedDeck[0].name}`}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>{" "}
        {/**/}
      </nav>
      <h1>Study:{currentLoadedDeck[0].name}</h1>

      <div class="card" style={{ width: "18rem" }}>
        <div class="card-body">
          <h5 class="card-title">
            {clickNumber}
            {" of "}
            {cardList.length}
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">{frontOrBackText}</h6>
          <p class="card-text">{frontOrBackDescription}</p>
          <button onClick={flipHandler} class="card-link btn btn-secondary">
            Flip
          </button>
          {!front ? (
            <button onClick={nextHandler} class="card-link btn btn-primary">
              Next
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );

  // );
}

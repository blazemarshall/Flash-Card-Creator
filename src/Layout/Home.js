import { useState, useEffect } from "react";
import { listDecks, readDeck } from "../utils/api";
import { Link, useHistory } from "react-router-dom";

export default function Home({ deckListData, setDeckListData }) {
  /* 
 has the following features
 
 The path to this screen should be /.
A "Create Deck" button is shown and clicking it brings the
 user to the Create Deck screen.

Existing decks are each shown with the deck name, the number 
of cards, and a “Study,” “View,” and “Delete” button.

Clicking the “Study” button brings the user to the Study screen.

Clicking the “View” button brings the user to the Deck screen.

Clicking the “Delete” button shows a warning message before 
deleting the deck.

 Delete Deck prompt
When the user clicks the "Delete" button, a warning message 
is shown and the user can click "OK" or "Cancel". If the user
 clicks "OK", the deck is deleted and the deleted deck is no
 longer visible on the Home screen.
You can use window.confirm() to create the modal dialog shown
 in the screenshot below.
 */
  const history = useHistory();

  const deleteButtonHandler = (indexToDelete) => {
    if (window.confirm("Do you really want to quash this item?")) {
      window.alert("Oh, you've done, did it now!");
      setDeckListData(
        deckListData.filter((deck, index) => index !== indexToDelete)
      );
    } else {
      window.alert("Thank God!");
    }
  };
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
  console.log("Home-ln49-deckListdata:", deckListData);

  return (
    <>
      <Link class="btn btn-secondary" to="/decks/new">
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-plus"
          viewBox="1 1 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>{" "}
        {"Create Deck"}
      </Link>
      {deckListData.map((deck, index) => (
        <div key={index} id={deck.id} class="card" style={{ width: "18rem" }}>
          {/*---Deck card render---*/}
          <div class="card-body">
            <h5 class="card-title">{deck.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted"></h6>
            <p class="card-text">{deck.description}</p>
            <div class="row">
              <div class="col">
                {/*---View---*/}
                <Link class="btn btn-secondary" to={`/decks/${deck.id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-eye-fill"
                    viewBox="0 1 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                  </svg>
                  {" View"}
                </Link>
                {/*---Study---*/}
                <Link class="btn btn-primary" to={`/decks/${deck.id}/study`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-mortarboard-fill"
                    viewBox="1 1 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"
                    />
                  </svg>
                  {" Study"}
                </Link>
              </div>
              <div class="col-right">
                <button
                  class="btn btn-danger"
                  onClick={() => deleteButtonHandler(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash-fill"
                    viewBox="0 1 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

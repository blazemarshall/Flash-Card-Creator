import { Link } from "react-router-dom";
import CardTemplate from "./CardTemplate";

export default function Home() {
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
  const deleteButtonHandler = () => {
    //remove deck
    //window.confirm
    if (window.confirm("Do you really want to Delete?")) {
      window.open("exit.html", "Thanks for Visiting!");
    }
  };

  return (
    <div>
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
        <div>
          <p>CardComponent</p>
          <CardTemplate deleteButtonHandler={deleteButtonHandler} />
        </div>
      </>
      g{" "}
    </div>
  );
}

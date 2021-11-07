export default function Home() {
  /* 
 has the following features
 
 The path to this screen should be /.
A "Create Deck" button is shown and clicking it brings the user to the Create Deck screen.
Existing decks are each shown with the deck name, the number of cards, and a “Study,” “View,” and “Delete” button.
Clicking the “Study” button brings the user to the Study screen.
Clicking the “View” button brings the user to the Deck screen.
Clicking the “Delete” button shows a warning message before deleting the deck.

 Delete Deck prompt
When the user clicks the "Delete" button, a warning message 
is shown and the user can click "OK" or "Cancel". If the user
 clicks "OK", the deck is deleted and the deleted deck is no
 longer visible on the Home screen.
You can use window.confirm() to create the modal dialog shown
 in the screenshot below.
 */

  return (
    <div>
      <>
        <button>GoToCreateDeckPage</button>
        <div>
          <p>CardComponent</p>
          <div>
            <button>View-GoToDeckPage</button>
            <button>GoToStudyPage</button>
          </div>
          <div>
            <button>Delete-showsAWarning</button>
          </div>
        </div>
      </>
      <p>HomeFunction Here.</p>
    </div>
  );
}

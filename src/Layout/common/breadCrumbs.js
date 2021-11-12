import React from "react";
import { Link } from "react-router-dom";

export default function breadyCrumbMaker({
  componentType,
  deckId,
  deckName,
  location,
}) {
  /* --------- displays -- Home  ----------------*/
  if (componentType === "single") {
    return (
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            Home
          </li>
        </ol>
      </nav>
    );
  }

  /*--------------  displays -- /Home/library  ----------------*/
  if (componentType === "double") {
    return (
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Library
          </li>
        </ol>
      </nav>
    );
  }

  /* ---------------- displays -- Home/Library/Data  ---------------*/
  return (
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li class="breadcrumb-item">
          <Link to="deckLoc">DeckName</Link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {location}
        </li>
      </ol>
    </nav>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function BreadCrumbs({
  componentType,
  deckName,
  deckLoc,
  currentLocation,
}) {
  /* --------- displays -- Home  ----------------*/
  if (componentType === "single") {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
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
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deckName.name}
          </li>
        </ol>
      </nav>
    );
  }
  // console.log
  /* ---------------- displays -- Home/Library/Data  ---------------*/
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={deckLoc}>{deckName.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {currentLocation}
        </li>
      </ol>
    </nav>
  );
}

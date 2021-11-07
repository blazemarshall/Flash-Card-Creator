import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";

import Home from "./Home";
function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <div>
          <Link to="/">Home</Link>
        </div>
        {/* TODO: Implement the screen starting here 
            //home
            //study
            //createDeck
            //Deck
            //Edit Deck
            //Add Card
            //Edit Card

              */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route></Route>
          <Route></Route>
          <Route></Route>
          <Route></Route>
          <Route></Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;

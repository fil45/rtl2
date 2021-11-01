import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "pages/home/HomePage";
import UsersPage from "pages/users/UsersPage";
import ReduxPage from "pages/redux/ReduxPage";
import ContextPage from "pages/context/ContextPage";
import ErrorPage from "pages/error/ErrorPage";
import Navbar from "components/Navbar/Navbar";

export default function Router() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="app-content">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/users">
              <UsersPage />
            </Route>
            <Route path="/redux">
              <ReduxPage />
            </Route>
            <Route exact path="/context">
              <ContextPage />
            </Route>
            <Route exact path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

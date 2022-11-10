import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/register" />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default App;

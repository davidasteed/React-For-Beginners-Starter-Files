import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import App from "./App";
import NotFound from "./NotFound";
import StorePicker from "./StorePicker";

const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* try out all of the routes and if no matches, go to the "not found" page */}
      <Route exact exact path="/" component={StorePicker} />
      <Route path="/store/:storeId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;

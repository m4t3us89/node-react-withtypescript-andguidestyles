import React from "react";
import { isAuthenticated } from "./auth";

import { BrowserRouter, Route, Switch, Redirect, RouteProps } from "react-router-dom";

import Login from './pages/Login/Login'
import User from './pages/User/User'

interface IRoutes extends RouteProps{
  component : any
}


const PrivateRoute = ({ component: Component, ...rest } : IRoutes) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/user" component={User} />
    </Switch>
  </BrowserRouter>
);

export default Routes
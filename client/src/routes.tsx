import React from "react";
import { isAuthenticated } from "./auth";

import { BrowserRouter, Route, Switch, Redirect, RouteProps } from "react-router-dom";

import Login from './pages/Login'
import User from './pages/User'
import CreateUser from './pages/CreateUser'

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
      <Route exact path="/user/create" component={CreateUser} />
      <PrivateRoute path="/user" component={User} />
    </Switch>
  </BrowserRouter>
);

export default Routes
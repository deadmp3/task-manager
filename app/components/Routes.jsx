import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SignIn } from './auth';
import { Home } from './home';
import { CreateUser, Users, ViewUser } from './users';
import { NotFound } from './notFound';

const renderRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return [
      <Route key="users" exact path="/users" component={Users} />,
      <Route key="ViewUser" exact path="/users/:id" component={ViewUser} />,
    ];
  }
  return [
    <Route key="signIn" path="/signIn" component={SignIn} />,
    <Route key="signUp" path="/signUp" component={CreateUser} />,
  ];
};

export default ({ isAuthenticated }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    {renderRoutes(isAuthenticated)}
    <Route path="/" component={NotFound} />
  </Switch>);

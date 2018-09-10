import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SignIn } from './auth';
import { Home } from './home';
import { CreateUser, Users } from './users';
import { NotFound } from './notFound';

const renderRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return [
      <Route key="users" exact path="/users" component={Users} />,
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

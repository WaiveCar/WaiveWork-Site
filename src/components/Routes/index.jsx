import React from 'react';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { verifyAuth } from '../../store/actions/userActions';
import Login from '../Login';
import Signup from '../Signup';

const routes = [
  {
    name: 'Login',
    path: '/login',
    component: Login,
    requireAuth: false,
  },
  {
    name: 'Singup',
    path: '/signup',
    component: Signup,
    requireAuth: false,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => <div>dashboard</div>,
    requireAuth: true,
  },
];

function Routes({ loggedIn }) {
  return (
    <Switch>
      {routes.map((route) => {
        if (!loggedIn && route.requireAuth) {
          return <Redirect key={route.name} to={'/login'} />;
        }
        if (loggedIn && !route.requireAuth) {
          return <Redirect key={route.name} to={'/dashboard'} />;
        }
        return (
          <Route
            key={route.name}
            path={route.path}
            component={route.component}
          />
        );
      })}
    </Switch>
  );
}
function mapStateToProps({ userReducer }) {
  return {
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);

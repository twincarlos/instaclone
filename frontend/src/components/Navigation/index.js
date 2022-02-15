import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/logo.png';
import * as sessionActions from '../../store/session';

import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const handleDemo = () => {
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }));
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <input type='text' placeholder='Search'></input>
        <NavLink id='demo' onClick={() => handleDemo()} to="/">Demo</NavLink>
        <NavLink id='a-login' to="/login">Log In</NavLink>
        <NavLink id='a-signup' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul id='navbar'>
      <li>
        <NavLink id='logo-home' exact to="/"><img src={logo} alt=''></img></NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;

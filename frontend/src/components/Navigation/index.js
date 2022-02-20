import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreatePostModal from '../CreatePostModal';
import { Modal } from '../../context/Modal';
import logo from '../../assets/logo.png';
import * as sessionActions from '../../store/session';

import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);

  const handleDemo = () => {
    return dispatch(sessionActions.login({ credential: 'ariana@grande.io', password: 'password' }));
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to='/'><i className="fas fa-home"></i></NavLink>
        <i className="far fa-comment-dots"></i>
        <i className="far fa-plus-square" onClick={() => setShowModal(true)}></i>
        <i className="far fa-compass"></i>
        <i className="far fa-heart nav-heart"></i>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <button id='demo' onClick={handleDemo}>Demo</button>
        <NavLink id='a-login' to="/login">Log In</NavLink>
        <NavLink id='a-signup' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <>
      <ul id='navbar'>
        <li>
          <NavLink id='logo-home' exact to="/"><img src={logo} alt=''></img></NavLink>
          <input type='text' placeholder='Search'></input>
          {isLoaded && sessionLinks}
        </li>
      </ul>
      {
        showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreatePostModal setShowModal={setShowModal} />
          </Modal>
        )
      }
    </>
  );
}

export default Navigation;

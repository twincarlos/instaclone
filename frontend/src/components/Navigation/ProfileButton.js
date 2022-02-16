import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <NavLink to='/'><i className="fas fa-home"></i></NavLink>
      <i className="far fa-comment-dots"></i>
      <i className="far fa-plus-square"></i>
      <i className="far fa-compass"></i>
      <i className="far fa-heart"></i>
      <button id='user-button' onClick={openMenu}>
        <img src='https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg' alt=''></img>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <NavLink to={`/users/${user.id}`}><i className="far fa-user-circle"></i><p>Profile</p></NavLink>
          <li><i className="far fa-bookmark"></i><p>Saved</p></li>
          <li><i className="fas fa-cog"></i><p>Settings</p></li>
          <li><button onClick={logout}><p>Logout</p></button></li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;

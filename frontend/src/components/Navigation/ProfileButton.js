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
      <button id='user-button' onClick={openMenu}>
        <img src={user.profileImageUrl} alt=''></img>
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

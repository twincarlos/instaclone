import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import iphone from '../../assets/iphone.png';
import logo from '../../assets/logo.png';

import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div id='login-div'>
      <img src={iphone} alt=''></img>
      <form onSubmit={handleSubmit}>
        <img src={logo}></img>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder='Username or email'
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
        <button type="submit">Log In</button>
        <p>------------------------- OR --------------------------</p>
      </form>
    </div>
  );
}

export default LoginFormPage;

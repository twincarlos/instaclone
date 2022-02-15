import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import iphone from '../../assets/iphone.png';
import logo from '../../assets/logo.png';

import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [activeButton, setActiveButton] = useState(false);

  useEffect(() => {
    if (credential.length > 0 && password.length > 5) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [credential, password]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e && e.preventDefault();
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
      <div id='login-form'>
        <form onSubmit={handleSubmit}>
          <img src={logo} alt=''></img>
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
          <button type="submit" disabled={!activeButton} className={activeButton ? 'active-button' : null}>Log In</button>
          <div><span /><p>OR</p><span /></div>
          <NavLink to='/' onClick={() => {
            setCredential('demo@user.io');
            setPassword('password');
            handleSubmit();
          }}><i className="fas fa-user"></i> Login as Demo</NavLink>
        </form>
        <div id='no-account'>
          Don't have an account? <NavLink to='/signup'>Sign up</NavLink>
        </div>
        <p>Connect with me.</p>
        <div id='connect'>
          <a target="_blank" rel="noreferrer" href='https://github.com/twincarlos'>
            <i className="fab fa-github"></i>
            <span>
              <h6>on Github</h6>
              <p>twincarlos</p>
            </span>
          </a>
          <a target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/carlos-rodriguez-a9a7b2214/'>
            <i className="fab fa-linkedin-in"></i>
              <span>
                <h6>on LinkedIn</h6>
                <p>Carlos R.</p>
              </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;

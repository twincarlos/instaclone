import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import logo from '../../assets/logo.png'

import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [activeButton, setActiveButton] = useState(false);

  useEffect(() => {
    if ((email.length > 4) && (username.length > 2) && (password.length > 5) && (confirmPassword.length > 5)) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [email, username, password, confirmPassword]);

  if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Passwords do not match.']);
  };

  const handleDemo = () => {
    setErrors([]);
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div id='signup-div'>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt=''></img>
        <p id='signup-to-see'>Sign up to see photos and videos from your friends.</p>
        <NavLink to='/' onClick={() => handleDemo()}><i className="fas fa-user"></i> Login as Demo</NavLink>
        <div><span/><p>OR</p><span /></div>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
            />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required
            />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
            />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
          />
        <button type="submit" disabled={activeButton ? false : true} className={activeButton ? 'active-button' : null}>Sign Up</button>
        <p id='terms'>By signing up, you agree to our <b>Terms</b> , <b>Data Policy</b> and <b>Cookies Policy</b> .</p>
      </form>
      <div id='no-account'>
          Have an account? <NavLink to='/login'>Log in</NavLink>
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
  );
}

export default SignupFormPage;

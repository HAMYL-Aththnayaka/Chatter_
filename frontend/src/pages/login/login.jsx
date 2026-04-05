import React, { useState } from "react";
import './login.css';
import Assets from '../../assets/assets';
import { signup, login } from "../../config/firebase";

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up"); // Consistent capitalization
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currState === "Sign Up") {
        await signup(userName, email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      console.error("Auth Error:", err);
      alert(err.message || "Something went wrong");
    }
  };

  const toggleState = () => {
    setCurrState(currState === "Sign Up" ? "Login" : "Sign Up");
  };

  return (
    <div className='login'>
      <img src={Assets.logo_big} alt='Logo' className='logo' />
      <form onSubmit={onSubmit} className='login-form'>
        <h2>{currState}</h2>

        {currState === "Sign Up" && (
          <input
            type="text"
            placeholder='Username'
            className="form-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder='Email'
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder='Password'
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type='submit'>{currState === "Sign Up" ? "Sign Up" : "Login"}</button>

        {currState === "Sign Up" && (
          <div className="login-term">
            <input type='checkbox' required />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>
        )}

        <div className='login-toggle'>
          {currState === "Sign Up" ? (
            <p>
              Already have an account? <span onClick={toggleState}>Login here</span>
            </p>
          ) : (
            <p>
              Don't have an account? <span onClick={toggleState}>Sign Up here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
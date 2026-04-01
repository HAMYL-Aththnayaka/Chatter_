import React from "react"
import './login.css'
import Assets from '../../assets/assets'
import { useState } from "react";
import { signup , login } from "../../config/firebase";



const Login = () => {
    const [currState, setCurrState] = useState("sign up");
    const[userName,setUserName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    
    const onSubmit = async (e) => {
        e.preventDefault();
        if (currState === "sign up") {
            await signup(userName, email, password);
        }else {
            await login(email, password);
        }
    };

    return (
        <div className='login'>
            <img src={Assets.logo_big} alt='' className='logo' />
            <form onSubmit={onSubmit} className='login-form'>
                <h2>{currState}</h2>
                {(currState == 'sign up') ?
                    <input onChange={(e)=>{setUserName(e.target.value)}} value={userName} type="text" placeholder='username' className="form-input" required /> : ""
                }
                <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" placeholder='email ' className="form-input" required/>
                <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" placeholder='password' className="form-input" required />
                {currState == "sign up" ?
                    <button type='submit'>Sign UP</button> : <button type='submit'>Log in</button>
                }
                <div className="login-term">
                    <input type='checkbox' required />
                    <p>Agree to the terms of use & privacy policy.</p>
                </div>

                <div className='login-forgot'>
                    {currState === "Sign Up" ? (
                        <p className='login-toggle'>
                            Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span>
                        </p>
                    ) : (
                        <p className='login-toggle'>
                            Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Click here</span>
                        </p>
                    )}
                </div>
            </form>
        </div>);
}

export default Login;
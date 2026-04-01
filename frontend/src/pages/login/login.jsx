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
                <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" placeholder='email ' className="form-input" />
                <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" placeholder='password' className="form-input" />
                {currState == "sign up" ?
                    <button type='submit'>Sign UP</button> : <button type='submit'>Log in</button>
                }
                <div className="login-term">
                    <input type='checkbox' />
                    <p>Agree to the terms of use & privacy policy.</p>
                </div>

                <div className='login-forgot'>
                    <p className='login-toggle'>{(currState == "sign up") ? <p>Already have an Account</p> : <p>Dont Have a Account </p>} <span onClick={() => { (currState == "sign up") ? setCurrState("Log in") : setCurrState('sign up') }}>click Here</span></p>
                </div>
            </form>
        </div>);
}

export default Login;
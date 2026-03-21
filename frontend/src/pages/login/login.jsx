import React from "react"
import './login.css'
import Assets from '../../assets/assets'
import { useState } from "react";
const login = () => {
    const [currState,setCurrState]=useState("sign up");
    return (
        <div className='login'>
            <img src={Assets.logo_big} alt='' className='logo' />
            <form action='' className='login-form'>
                <h2>{currState}</h2>
                {(currState == 'sign up')?
                <input type="text" placeholder='username' className="form-input" required />:"" 
                }
                <input type="email" placeholder='email ' className="form-input" />
                <input type="password" placeholder='password' className="form-input" />
                <button type='submit'>Sign UP</button>
                <div className="login-term">
                    <input type='checkbox' />
                    <p>Agree to the terms of use & privacy policy.</p>
                </div>

                <div className='login-forgot'>
                    <p className='login-toggle'>{(currState == "sign up")?<p>Already have an Account</p>:<p>Dont Have a Account </p>} <span onClick={()=>{(currState == "sign up")?setCurrState("Log in"):setCurrState('sign up')}}>click Here</span></p>
                </div>
            </form>
        </div>);
}

export default login;
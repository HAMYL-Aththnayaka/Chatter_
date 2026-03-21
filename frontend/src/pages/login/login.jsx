import React from "react"
import './login.css'
import Assets from '../../assets/assets'
const login =()=>{
    return(
    <div className='login'>
        <img src={Assets.logo_big} alt='' className='logo'/>
        <form action='' className='login-form'>
            <h2>Sign UP</h2>
            <input type="text" placeholder='username'className="form-input" required />
            <input type="email" placeholder='email ' className="form-input" />
            <input type="password" placeholder='password' className="form-input" />
        </form>
    </div>);
}

export default login;
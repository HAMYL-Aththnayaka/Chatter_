import React, { useState } from 'react'
import './profileUpdate.css'
import assets from "../../assets/assets"

const profileUpdate = () => {
  const [image,setImage] = useState(false);
  const [name,setName] = useState("");
  const [bio,setBio] = useState("");
  return (
    <div className='profile'>
        <div className='profile-container'>
              <form>
                <h3>Profile Details</h3>
                <label htmlFor="avatar">
                  <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="avatar" accept='.png, .jpg, .jpeg' hidden/>
                  <img src={image ? URL.createObjectURL(image): assets.avatar_icon} alt=''/>
                  upload profile image
                </label>
                <input type='text' placeholder='Your Name' required/>
                <textarea placeholder='Write Profile Bio'required></textarea>
                <button type='submit'>Save</button>
              </form>
              <img className='pro-pic' src={image? URL.createObjectURL(image) : assets.logo_icon}/>
        </div>
      </div>
  )
}

export default profileUpdate 
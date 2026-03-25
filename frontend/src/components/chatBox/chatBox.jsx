import React from 'react'
import './chatBox.css'
import assets from '../../assets/assets'

const chatBox = () => {
  return (
    <div className="chat-box">
      <div className="chat-user">
        <img src={assets.profile_img} alt=""/>
        <p>Yasas Aththanayaka <img src={assets.green_dot} alt="" className='dot'/></p>
        <img src={assets.help_icon} alt=""/>
      </div>


      <div className="chat-msg">
        <div className="s-msg">
          <p className="msg">The Typed Massage for display</p>
        </div>
        <img src={assets.profile_img} alt=''/>
        <p>2:30</p>
      </div>


      <div className="chat-input">
        <input type="text" placeholder="send a message"/>
        <input type="file" id='image' accept='image/png,image/jpeg' hidden/>
        <label htmlFor='image'>
          <img src={assets.gallery_icon} alt=''/>
        </label>
        <img src={assets.send_button} alt=''/>
      </div>
    </div>
  )
}

export default chatBox

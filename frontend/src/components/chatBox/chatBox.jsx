import React from 'react'
import './chatBox.css'
import assets from '../../assets/assets'

const ChatBox = () => {
  return (
    <div className="chat-box">

      {/* Header */}
      <div className="chat-user">
        <img className="profile-pic" src={assets.profile_img} alt="profile" />
        <p>
          Yasas Aththanayaka 
          <img src={assets.green_dot} alt="" style={{ width: '10px', marginLeft: '5px' }} />
        </p>
        <img src={assets.help_icon} alt="help" style={{ width: '20px', marginLeft: 'auto' }} />
      </div>

      {/* Messages */}
      <div className="chat-msg">

        {/* Sent Text */}
        <div className="s-msg">
          <img className="profile-pic" src={assets.profile_img} alt='' />
          <div>
            <p className="msg">The Typed Message for display</p>
            <p className="time">2:30</p>
          </div>
        </div>

        {/* Sent Image */}
        <div className="s-msg">
          <img className="profile-pic" src={assets.profile_img} alt='' />
          <div>
            <img className='msg-image' src={assets.pic1} alt='' />
            <p className="time">2:30</p>
          </div>
        </div>

        {/* Received Text */}
        <div className="r-msg">
          <img className="profile-pic" src={assets.profile_img} alt='' />
          <div>
            <p className="msg">The Typed Message for display</p>
            <p className="time">2:30</p>
          </div>
        </div>

      </div>

      {/* Input */}
      <div className="chat-input">
        <input type="text" placeholder="send a message" />

        <label htmlFor='image'>
          <img src={assets.gallery_icon} alt='' />
        </label>

        <input type="file" id='image' hidden />

        <img src={assets.send_button} alt='' />
      </div>

    </div>
  )
}

export default ChatBox
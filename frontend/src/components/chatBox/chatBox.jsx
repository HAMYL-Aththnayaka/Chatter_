import React from 'react'
import './chatBox.css'
import assets from '../../assets/assets'

const ChatBox = () => {
  return (
    <div className="chat-box">
      {/* User Header */}
      <div className="chat-user">
        <img src={assets.profile_img} alt="profile" />
        <p>Yasas Aththanayaka <img src={assets.green_dot} alt="" className='dot' /></p>
        <img src={assets.help_icon} alt="help" />
      </div>

      {/* Message Area */}
      <div className="chat-msg">
        
        {/* Sent Text Message */}
        <div className="s-msg">
          <img src={assets.profile_img} alt='sender-pp' />
          <div>
            <p className="msg">The Typed Message for display</p>
            <p className="time">2:30</p>
          </div>
        </div>

        {/* Sent IMAGE Message (The image you sent) */}
        <div className="s-msg">
          <img src={assets.profile_img} alt='sender-pp' />
          <div>
            <img className='msg-image' src={assets.pic1} alt='sent-pic' />
            <p className="time">2:30</p>
          </div>
        </div>

        {/* Received Text Message */}
        <div className="r-msg">
          <img src={assets.profile_img} alt='receiver-pp' />
          <div>
            <p className="msg">The Typed Message for display</p>
            <p className="time">2:30</p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="chat-input">
        <input type="text" placeholder="send a message" />
        <input type="file" id='image' accept='image/png,image/jpeg' hidden />
        <label htmlFor='image'>
          <img src={assets.gallery_icon} alt='gallery' />
        </label>
        <img src={assets.send_button} alt='send' />
      </div>
    </div>
  )
}

export default ChatBox
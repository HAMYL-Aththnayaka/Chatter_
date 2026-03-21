import React from "react"
import './chat.css'
import LeftSideBar from "../../components/leftSideBar/LeftSideBar"
import ChatBox from '../../components/chatBox/chatBox'
import RightSideBar from '../../components/rightSideBar/RightSideBar'


const chat =()=>{
    return(
    <div className='chat'>
        <div className="chat-container">
            <LeftSideBar/>
            <ChatBox/>
            <RightSideBar/>
        </div>
    </div>);
}

export default chat;
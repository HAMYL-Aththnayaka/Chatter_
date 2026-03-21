import React from 'react'
import './LeftSideBar.css'
import assets from "../../assets/assets"


const LeftSideBar = () => {
  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="" className='logo' />
        </div>
      </div> 
    </div>
  )
}

export default LeftSideBar
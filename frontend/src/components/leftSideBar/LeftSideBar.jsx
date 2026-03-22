import React from 'react'
import './LeftSideBar.css'
import assets from "../../assets/assets"


const LeftSideBar = () => {
  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="" className='logo' />
            <div className="menu">
              <img src={assets.menu_icon} alt='' />
            </div>
            <div className="ls-search">
              <img src={assets.search_icon} alt=''/>
              <input type='text' placeholder='search ....'/>
            </div>
        </div>
      </div> 
    </div>
  )
}

export default LeftSideBar
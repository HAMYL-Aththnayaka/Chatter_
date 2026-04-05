import React, { useState } from 'react'
import './LeftSideBar.css'
import assets from "../../assets/assets"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { query, where } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { useContext } from 'react';
import { AppContext } from '../../context/appContext';

const LeftSideBar = () => {

  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const useRef = collection(db, "users");
        const q = query(
          useRef,
          where("username", ">=", input.toLowerCase()),
          where("username", "<=", input.toLowerCase() + '\uf8ff')
        );
        const querySnap = await getDocs(q);
        if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
          setUser(querySnap.docs[0].data());
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);

      }

    } catch (error) {
      console.log(error);
      toast.error("Error while searching");
    }
  }

  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="" className='logo' />
          <div className="menu">
            <img src={assets.menu_icon} alt='' />
            <div className="sub-menu">
              <p onClick={() => navigate('/profile')}>Edit Profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt='' />
          <input onChange={inputHandler} type='text' placeholder='search ....' />
        </div>
      </div>

      <div className="ls-list">
        {showSearch && user ? (
          <div className="friends add-user">
            <img src={user.avatar} alt='' />
            <p>{user.name}</p>
          </div>
        ) : (
          Array(8).fill("").map((item, index) => (
            <div key={index} className="friends">
              <img src={assets.profile_img} alt='' />
              <div>
                <p>Yasas Lasitha</p>
                <span>Hello, Whats Up</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default LeftSideBar
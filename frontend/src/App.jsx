import React from 'react';
import { useEffect } from 'react';
import {Routes,Route, useNavigate} from "react-router-dom";
 import { ToastContainer, toast } from 'react-toastify';

import Login from './pages/login/login';
import Chat from './pages/chat/chat';
import ProfileUpdate from './pages/profileUpdate/profileUpdate';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { useContext } from 'react';
import { AppContext } from './context/appContext';



const App=()=>{
  const navigate = useNavigate();
  const { loadUserData } = useContext(AppContext); 

  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        navigate("/chat");
        await loadUserData(user.uid);
      }else{
        console.log("No user is logged in.");
        navigate("/");
      }
    }); 
  },[]);  
  return (
  <>
  <ToastContainer/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/profile' element={<ProfileUpdate/>}/>

    </Routes>
  </>
          );

}
export default App;
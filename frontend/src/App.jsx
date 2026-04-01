import React from 'react';
import { useEffect } from 'react';
import {Routes,Route, useNavigate} from "react-router-dom";
 import { ToastContainer, toast } from 'react-toastify';

import Login from './pages/login/login';
import Chat from './pages/chat/chat';
import ProfileUpdate from './pages/profileUpdate/profileUpdate';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';



const App=()=>{
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        navigate("/chat");
        console.log("User is logged in:", user);
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
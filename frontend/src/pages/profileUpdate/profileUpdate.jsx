import React, { useEffect, useState } from 'react'
import './profileUpdate.css'
import { auth, db } from "../../config/firebase"
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import upload from '../../lib/upload';
import assets from "../../assets/assets"
import { updateDoc } from 'firebase/firestore';


const profileUpdate = () => {
  const navigate = useNavigate();
  const [image,setImage] = useState(false);
  const [name,setName] = useState("");
  const [bio,setBio] = useState("");
  const [uid,setUid] = useState("");
  const [prevImage,setPrevImage] = useState("");

  const profileUpdate = async(event)=>{
    event.PreventDefault();
    try{
      if(!prevImage && !image){
        toast.error("Please Upload a Profile Picture !!");
      }
      const docRef = doc(db, "users", uid);
      if(image){
        const ImgURL = await upload(image);
        setPrevImage(ImgURL);
        await updateDoc(docRef,{
          avatar: ImgURL,
          bio:bio,
          name:name
        });
      }else{
        await updateDoc(docRef,{
          bio:bio,
          name:name
        });
      }
    }catch(error){
      console.error(error.toString());
    }
  }

  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        setUid(user.uid);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if(docSnap.data().name){
        setName(docSnap.data().name);
      }
      if(docSnap.data().bio){
        setBio(docSnap.data().bio);
      }
      if(docSnap.data().avatar){
        setPrevImage(docSnap.data().avatar);
      }
      }
      else{
        navigate("/");
      }
  }, []);
});
  return (
    <div className='profile'>
        <div className='profile-container'>
              <form onSubmit={profileUpdate}>
                <h3>Profile Details</h3>
                <label htmlFor="avatar">
                  <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="avatar" accept='.png, .jpg, .jpeg' hidden/>
                  <img src={image ? URL.createObjectURL(image): assets.avatar_icon} alt=''/>
                  upload profile image
                </label>
                <input onChange={(e)=>setName(e.target.value)} value={name} type='text' placeholder='Your Name' required/>
                <textarea onChange={(e)=>setBio(e.target.value)} value={bio} placeholder='Write Profile Bio' required></textarea>
                <button type='submit'>Save</button>
              </form>
              <img className='pro-pic' src={image? URL.createObjectURL(image) : assets.logo_icon}/>
        </div>
      </div>
  )
}

export default profileUpdate 
import React, { useEffect, useState, useContext } from 'react';
import './profileUpdate.css';
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import upload from '../../lib/upload';
import assets from "../../assets/assets";
import { AppContext } from "../../context/appContext";

const ProfileUpdate = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");

  const { setUserData } = useContext(AppContext);

  // ✅ Handle form submit
  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    try {
      if (!prevImage && !image) {
        toast.error("Please Upload a Profile Picture !!");
        return;
      }

      const docRef = doc(db, "users", uid);

      let updatedData = {
        name,
        bio
      };

      // ✅ Upload new image if selected
      if (image) {
        const imgURL = await upload(image);
        updatedData.avatar = imgURL;
        setPrevImage(imgURL);
      }

      // ✅ Update Firestore
      await updateDoc(docRef, updatedData);

      // ✅ Refresh user data
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setUserData(snap.data());
      }

      toast.success("Profile Updated Successfully !!");
      navigate("/chat");

    } catch (error) {
      console.error(error);
      toast.error("Error Updating Profile !!");
    }
  };

  // ✅ Fetch user data on load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          if (data.name) setName(data.name);
          if (data.bio) setBio(data.bio);
          if (data.avatar) setPrevImage(data.avatar);
        }
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className='profile'>
      <div className='profile-container'>
        
        <form onSubmit={handleProfileUpdate}>
          <h3>Profile Details</h3>

          <label htmlFor="avatar">
            <input
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />

            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : prevImage ? prevImage : assets.avatar_icon
              }
              alt="profile"
            />

            upload profile image
          </label>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Write Profile Bio"
            value={bio}
            required
            onChange={(e) => setBio(e.target.value)}
          />

          <button type="submit">Save</button>
        </form>

        {/* Preview section */}
        <img
          className='pro-pic'
          src={
            image
              ? URL.createObjectURL(image)
              : prevImage || assets.logo_icon
          }
          alt="preview"
        />

      </div>
    </div>
  );
};

export default ProfileUpdate;
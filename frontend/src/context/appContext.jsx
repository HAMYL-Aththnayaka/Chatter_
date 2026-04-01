import { createContext, useState } from "react";
import {getDoc, doc} from "firebase/firestore";
import { db } from "../config/firebase";
export const AppContext = createContext();

const AppContextProvider = ( props ) => {
    const [userData,setUserData]=useState(null);
    const [chatData,setChatData]=useState(null);
    
    const loadUserData=async(uid)=>{
       try {
        const userRef =doc(db,"users",uid);
        const userSnap = await getDoc(userRef);
        console.log("User data fetched successfully:", userSnap.data());
       }    catch (error) {
        console.error("Error fetching user data:", error);
       }
    }
 const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData
 };
 return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
 );
}; 

export default AppContextProvider;
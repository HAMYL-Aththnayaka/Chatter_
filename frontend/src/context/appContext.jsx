import { createContext, useState } from "react";
import {getDoc, doc, updateDoc} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

export const AppContext = createContext();


const AppContextProvider = ( props ) => {
    const [userData,setUserData]=useState(null);
    const [chatData,setChatData]=useState(null);
    const navigate = useNavigate();


    const loadUserData=async(uid)=>{
       try {
        const userRef =doc(db,"users",uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        //console.log("User data fetched successfully:", userData);
        setUserData(userData);
        if(userData.avatar && userData.name){
            navigate("/chat");
        }else{
            navigate("/profile");
        }
        
        await updateDoc(userRef, {
            lastSeen: Date.now()
        });

        setInterval(async()=>{
            if(auth.chatUser){
                await updateDoc(userRef, {
                    lastSeen: Date.now()
                });
            }

        },60000);

    }    catch (error) {
        console.error("Error fetching user data:", error);
       }
    } 

    useEffect(()=>{
        if(userData){
            const chatref = doc(db,"chats",userData.id);
            const unsub = onSnapshot(chatref,async(res)=>{
               const chatItems = res.data().chatsData;
               const tempData=[];
               for(const item of chatItems){
                const userRef = doc(db,"users",item.rid);
                const userSnap = await getDoc(userRef);
                const userData = userSnap.data();
                tempData.push({
                    ...item,
                    userData});
               }
               setChatData(tempData.sort((a,b)=>b.updatedAt -a.updatedAt));
            });
            return () => unsub();
        }
    },[userData]);
 
 
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
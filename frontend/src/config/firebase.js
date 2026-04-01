import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"; // Added createUser...
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Added doc, setDoc
import { toast } from 'react-toastify'; 


const firebaseConfig = {
  apiKey: "AIzaSyCVSVMY90SC3x-ahMF6S5DPb8Qzx0PHDFI",
  authDomain: "chatter-b56b2.firebaseapp.com",
  projectId: "chatter-b56b2",
  storageBucket: "chatter-b56b2.firebasestorage.app",
  messagingSenderId: "180363363002",
  appId: "1:180363363002:web:5a49a9ca692208fa1a7883"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    // 1. Create the user in Firebase Auth
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // 2. Store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name:'',
      avatar:"",
      bio:'Hi Im a Chatter ',
      lastSeen:Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatData:[]
    }); // Initialize empty userChats document

    console.log("User registered successfully!");
  } catch (error) {
    console.error("Signup error:",error.toString());
    toast.error(error.code.split("/")[1].replace(/-/g, " ")); 
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully!");
  } catch (error) {
    console.error("Login error:", error.toString());
    toast.error(error.code.split("/")[1].replace(/-/g, " ")); 
  } 
}

const logout = async () => {
  try {
    await auth.signOut(); 

    console.log("User logged out successfully!");
  } catch (error) {
    console.error("Logout error:", error.toString());
    toast.error("Failed to log out. Please try again."); 
  }
};
export { signup ,login,logout,auth,db};
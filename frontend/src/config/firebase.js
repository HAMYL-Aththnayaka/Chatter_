import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Added createUser...
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Added doc, setDoc

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
    await setDoc(doc(db, "chats", user.uid), {}); // Initialize empty userChats document

    console.log("User registered successfully!");
  } catch (error) {
    console.error("Signup error:", error.code, error.message);
  }
};
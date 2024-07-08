// frontend/Firebase.js
import axios from 'axios';
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query, 
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const bcrypt = require('bcryptjs');

const firebaseConfig = {
  apiKey: "AIzaSyAc8kADndC6YpfDGf_FVohMjuPBk1559_U",
  authDomain: "ish-ebead.firebaseapp.com",
  projectId: "ish-ebead",
  storageBucket: "ish-ebead.appspot.com",
  messagingSenderId: "113234820786",
  appId: "1:113234820786:web:552074e6352020052e13ab",
  measurementId: "G-H8BXMCGKN2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// const signInWithGoogle = async () => {
//   try {
//     const response = await signInWithPopup(auth, googleProvider);
//     const user = response.user;
//     const q = query(collection(db, "users"), where("uid", "==", user.uid));
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });

//       await axios.post('http://localhost:5001/api/users/register', {
//         uid: user.uid,
//         name: user.displayName,
//         email: user.email,
//         authProvider: "google"
//       });

//       console.log("User added to Firestore and MongoDB:", user);
//     } else {
//       console.log("User already exists in Firestore:", user);
//     }
//   } catch (error) {
//     console.log(error.message);
//     alert(error.message);
//   }
// };

const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    const user = response.user;
    const token = await user.getIdToken();
    localStorage.setItem('token', token); 

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        surveyCompleted: false
      });

      // send user date to the backend api
      await axios.post('http://localhost:5001/api/users/register', {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        authProvider: "google"
      });

      console.log("User added to Firestore and MongoDB:", user);
    } else {
      console.log("User already exists in Firestore:", user);
    }

    return user; // return user data
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    // check if email is exist
    const q = query(collection(db, "users"), where("email", "==", email));
    const docs = await getDocs(q);
    if (docs.docs.length > 0) {
      console.log("Email already exists");
      alert("Email already exists. Please log in.");
      return;
    }

    // if email doesn't exist, continue to registration
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      password: hashedPassword,
      email,
      authProvider: "local",
    });

    // send user data to backend api (local)
    await axios.post('http://localhost:5001/api/users/register', {
      uid: user.uid,
      name,
      email,
      password: hashedPassword,
      authProvider: "local"
    });

    console.log("User registered and added to Firestore and MongoDB:", user);
  } catch (error) {
    console.log(error.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email is sent!");
  } catch (error) {
    console.log(error.message);
  }
};

const logOut = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithEmailAndPassword,
  logInWithEmailAndPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logOut
};

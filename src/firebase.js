import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBMQ6qa_RFsNBZOIOJDslSf0Y8BRmukruk",
  authDomain: "react-fnl-proj.firebaseapp.com",
  projectId: "react-fnl-proj",
  storageBucket: "react-fnl-proj.firebasestorage.app",
  messagingSenderId: "942656922323",
  appId: "1:942656922323:web:b3bc1908c462d9e86baa26"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }
    catch (error) {
        console.log(error);
        alert(error);
    }
}

const login = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = () => {
    signOut(auth)
}

export { auth, db, login, signup, logout }
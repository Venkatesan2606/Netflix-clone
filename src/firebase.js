import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCbVlmnlJB3X8M81qWVI8f7teX62JIGY3U",
  authDomain: "netflix-clone-ca632.firebaseapp.com",
  projectId: "netflix-clone-ca632",
  storageBucket: "netflix-clone-ca632.firebasestorage.app",
  messagingSenderId: "865931211620",
  appId: "1:865931211620:web:5bdc117d9b9c574f338071"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup =async (name,email,password)=> {
    try {
        const res = await createUserWithEmailAndPassword(auth,name,email,password)
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login =async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = async()=> {
    signOut(auth);
}

export { auth, db, login, signup, logout };

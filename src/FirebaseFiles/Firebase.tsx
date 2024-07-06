
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqTlMku70yRu3QmZiblhZuUk8dP5xEjXQ",
  authDomain: "mychatapp-e1f94.firebaseapp.com",
  projectId: "mychatapp-e1f94",
  storageBucket: "mychatapp-e1f94.appspot.com",
  messagingSenderId: "972508292177",
  appId: "1:972508292177:web:743e1d95abc1fc69fe4470"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export {auth, provider,db}; 
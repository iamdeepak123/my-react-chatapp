
import { createContext, useReducer, useState } from "react";
import { auth, provider, db } from "../FirebaseFiles/Firebase"
import reducer from "../ReducerFiles/LoginReducer"
import { signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Firestore, doc, setDoc, addDoc, collection } from "firebase/firestore";

const logincontext = createContext<any>("");

// type loginprops = {
//     children: any
// }


const Loginprovider = ({ children }: any) => {

    const [userdetails, setUserdetails] = useState<any>({
        email: "",
        password: "",

    })

    const loginWithGoole = () => {
        signInWithPopup(auth, provider).then(async (data) => {
            dispatch({ type: "LOG_IN", payload: data.user });
            await addDoc(collection(db, "GoogleAccounts"), {
                Email: data.user.email,
                Name: data.user.displayName,
            })
        }

        )

    }

    const textinput = (e: any) => {
        let name: string = e.target.name;
        let value: string = e.target.value;
        setUserdetails({ ...userdetails, [name]: value })
    }

    const loginWithemail = (e: any) => {
        e.preventDefault();

        const { email, password } = userdetails;

        if (email && password) {

            signInWithEmailAndPassword(auth, email, password).then((data) => {
                console.log(data.user);
                dispatch({ type: "LOG_IN", payload: data.user });

            })
            setUserdetails({
                email: "",
                password: "",

            })
        } else alert("Enter the details");

    }


    const Logoutbtn = () => {
        signOut(auth).then(() => {
            alert("logout success");
        })
        dispatch({ type: "LOG_OUT" });
    }

    const initialState: any = {
        password: "",
        email: "",
        NavActive: false,
        name: "",
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <logincontext.Provider value={{ ...state, loginWithGoole, textinput, userdetails, loginWithemail, Logoutbtn }}>
            {children}

        </logincontext.Provider>
    )

}

export default Loginprovider;
export { logincontext }
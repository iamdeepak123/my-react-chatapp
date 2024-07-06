import { useState } from "react"
import { Link } from "react-router-dom"
import { auth, db } from "../FirebaseFiles/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const RegisterPage = () => {

    const [regiterdetails, setRegiterdetails] = useState({

        name: "",
        email: "",
        password: "",
    });

    const userinput = (e: any) => {
        let name = e.target.name;
        let value = e.target.value;
        setRegiterdetails({ ...regiterdetails, [name]: value })

    }
    const creatUserAccount = (e: any) => {
        e.preventDefault();
        const { email, password } = regiterdetails;
        if (email && password) {
            createUserWithEmailAndPassword(auth, email, password).then(async (userdata) => {
                console.log(userdata.user);
                await addDoc(collection(db, "CreatedAccounts"), {
                    Email: userdata.user.email,
                    Name: userdata.user.email?.slice(0, 6),

                }


                ).catch((error) => {

                    const errorMessage = error.message;
                    alert(errorMessage);
                });
            })
            alert("Account Created")
            setRegiterdetails({
                name: "",
                email: "",
                password: "",
            })

        }
    }

    return (
        <>
            <div className="login_container">

                <form action="" method="POST">
                    <h3>Login </h3>
                    <div className="input_field">
                        <input type="text" name="name" placeholder="Full Name" value={regiterdetails.name} onChange={userinput} autoComplete="off" />
                    </div>
                    <div className="input_field">
                        <input type="Email" name="email" placeholder="Email" value={regiterdetails.email} onChange={userinput} autoComplete="off" />
                    </div>
                    <div className="input_field">

                        <input type="password" name="password" placeholder="Password" value={regiterdetails.password} onChange={userinput} autoComplete="off" />
                    </div>
                    <div className="login_button">
                        <Link to="/"><button onClick={creatUserAccount}>Create Account</button></Link>
                    </div>
                </form>

                <div className="signup_div">
                    {<div>
                        <p>Already Have Account? <Link to="/"><button >Login Here</button></Link></p>

                    </div>}

                </div>



            </div>
        </>
    )
}

export default RegisterPage
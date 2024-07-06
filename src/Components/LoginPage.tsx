
import { useContext } from "react"
import image from "../images/loginwithGoogle.png"
import { Link } from "react-router-dom"
import { logincontext } from "../ContextFiles/LoginContext"
import HomePage from "./HomePage"



const LoginPage = () => {

    const { NavActive, loginWithGoole, userdetails, textinput, loginWithemail } = useContext(logincontext);

    return (
        <>
            {NavActive ? <HomePage />
                :
                <div className="login_container">

                    <form action="" method="POST">
                        <h3>Login </h3>
                        <div className="input_field">
                            <input type="Email" name="email" placeholder="Email" value={userdetails.email} onChange={textinput} autoComplete="off" />
                        </div>
                        <div className="input_field">

                            <input type="password" name="password" placeholder="Password" value={userdetails.password} onChange={textinput} autoComplete="off" />
                        </div>
                        <div className="login_button">
                            <button onClick={loginWithemail}>Login</button>
                            {
                            }                </div>
                    </form>

                    <div className="signup_div">
                        <div>
                            <p>Don't Have Account? <Link to="/RegisterPage"> <button >Register Here</button></Link></p>

                        </div>
                        <p>Or</p>
                        <img onClick={loginWithGoole} src={image} alt="img" />
                    </div>
                </div>

            }
        </>
    )

}

export default LoginPage
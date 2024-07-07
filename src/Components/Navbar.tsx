import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { logincontext } from "../ContextFiles/LoginContext";
import MenuIcon from '@mui/icons-material/Menu';
import { auth } from "../FirebaseFiles/Firebase";
import CloseIcon from '@mui/icons-material/Close';
const Navbar = () => {
  const [value, setValue] = useState(false)
  const { room, Logoutbtn } = useContext(logincontext);

  
  return (
    <nav>
      
      <div className={value ? "Navbar_container active" : "Navbar_container"}>
        <div className="nav_list">

          <ul>

            <Link to="/Home" onClick={() => setValue(false)}>  <li>Home</li></Link>
            <Link to="/About" onClick={() => setValue(false)}><li>About</li> </Link>
            <Link to="/Chatlist" onClick={() => setValue(false)}>  <li>ChatList</li></Link>

          </ul>
        </div>
        <div className="hidemenuIcon">

          <MenuIcon className="menuIcon" onClick={() => setValue(true)} />

          <CloseIcon className="closeicon" onClick={() => setValue(false)} />

        </div>
        <div className="Navbar_Btn_div">
          <p style={{ color: "white" }}>{auth.currentUser?.email}</p>
          {room ? <Link to="/"> <button onClick={Logoutbtn}>Logout</button> </Link> : <p></p>}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

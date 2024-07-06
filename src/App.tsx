import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
import AboutPage from "./Components/AboutPage";
import RegisterPage from "./Components/RegisterPage";
import { useContext } from "react";
import { logincontext } from "./ContextFiles/LoginContext";
function App() {

const{NavActive} = useContext(logincontext);

  return (
    <>

      <BrowserRouter>
        {NavActive&&<Navbar/>}
        
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Chatlist" element={<p>Chatlist</p>} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
         
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

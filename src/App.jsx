import React, { useContext, useEffect } from 'react'
import {Routes , Route , BrowserRouter as Router} from "react-router-dom"
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Register from './pages/Register'
import Home from './pages/Home'
import Verify from './pages/Verify'
import axios from "axios"
import { Context } from './main'

axios.defaults.baseURL = "https://user-management-backend-eiyb.onrender.com"

const App = () => {
  const { setisAuthenticated, setuser } = useContext(Context);

  useEffect(() => {
    axios.get("/profile" , {withCredentials:true})
      .then(response => {
        setisAuthenticated(true);
        setuser(response.data.user);
      })
      .catch(error => {
        setisAuthenticated(false);
        setuser(null);
    })
  }, [])
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/verify" element={<Verify/>}/>
      </Routes>
    </Router>
  )
}

export default App
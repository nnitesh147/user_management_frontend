import React, { useContext } from 'react'
import { Context } from '../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const Home = () => {

  const { isAuthenticated, user , setisAuthenticated , setuser , loading} = useContext(Context);


  const logoutHandler = async(e) => {
    e.preventDefault();
    try {
      await axios.get("/logout", {
        withCredentials:true,
      });
      alert("Log Out Successfull");
      setisAuthenticated(false);
      setuser(null);
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }

  if(loading){
    return;
  }
  
  if (!isAuthenticated) {
    return <Navigate to={"/"}/>
  }

  return (
    <div>
      <div>
        <h1>Your Profile data</h1>
      </div>
      <div className='py-2 mr-3 right-0 right-0'>
        <h2>{user?.email}</h2>
        <h4>{user.verified ? "Verified" : "Not Verified"}</h4>
      </div>
      <button className='primary' onClick={logoutHandler}>LogOut</button>
    </div>
  )
}

export default Home

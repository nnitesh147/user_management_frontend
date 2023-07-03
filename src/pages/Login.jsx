import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';

const Login = () => {
    const [Password, setPassword] = useState("");
    const [email, setemail] = useState("");
    const [redirect, setredirect] = useState(false);
    const { isAuthenticated, setisAuthenticated, setuser } = useContext(Context);

    const submitHandler = async(e) =>{
        e.preventDefault();
        try {
            const { data } = await axios.post("/login", { email, Password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
        
            alert(data?.message);
            setisAuthenticated(true);
            setuser(data);
        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.message);
            setisAuthenticated(false);
            setPassword("");
            setuser(null);
            if (!error?.response?.data?.verified) {
                setredirect(true);
            }
        }
    }

    if (redirect) {
        return <Navigate to={"/verify"}/>
    }

    if (isAuthenticated) {
        return <Navigate to={"/home"}/>
    }
    
    return (
    <div className='mt-10 grow flex items-center justify-around'>
        <div className='mb-64'>
            <h1 className='text-4xl text-center mb-4'>Login</h1>
            <form className='max-w-md mx-auto' onSubmit={submitHandler}>
                    <div>
                        <div>
                           <input   type='text' placeholder='E-mail' required value={email} onChange={(e)=> setemail(e.target.value)}/>
                           <input type='password' placeholder='Password' required value={Password} onChange={(e)=> setPassword(e.target.value)}/>
                        </div>
                        <div className='py-2 mr-3 right-0 right-0'>
                            <Link className='underline text-black' to={"/forgotpassword"}>Forgot Passord</Link>
                        </div>
                        <button className='primary' type='submit'>Login</button>
                    </div>
                    <div className='text-center py-2 text-gray-500'>Don't have an account yet? 
                       <Link className='underline text-black' to={"/register"}> Register</Link>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default Login
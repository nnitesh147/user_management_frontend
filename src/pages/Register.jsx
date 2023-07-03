import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';

const Register = () => {
    const [email, setemail] = useState("");
    const [Password, setPassword] = useState("");
    const [redirect, setredirect] = useState(false);


    const submitHandler = async (e) =>{
        e.preventDefault();
        try {
            const { data } = await axios.post("/register", { email, Password });
            alert(data?.message);
            setredirect(true);
        } catch (error) {
            alert(error?.response?.data?.message);
            console.log(error);
            setredirect(false);
        }
    }


    if(redirect){
        return <Navigate to={"/verify"}/>
    }

  return (
    <div className='mt-10 grow flex items-center justify-around'>
    <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto' onSubmit={submitHandler}>
                <div>
                    <div>
                       <input type='text' placeholder='E-mail' required value={email} onChange={(e)=> setemail(e.target.value)}/>
                       <input type='password' placeholder='Password' required value={Password} onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <button className='primary' type='submit'>Register</button>
                </div>
                <div className='text-center py-2 text-gray-500'>Have an account! 
                   <Link className='underline text-black' to={"/"}> Login</Link>
                </div>
        </form>
    </div>
</div>
  )
}

export default Register
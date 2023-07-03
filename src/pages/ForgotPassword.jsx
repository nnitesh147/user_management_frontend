import React from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setemail] = useState("");
    const [verified, setverified] = useState(false);
    const [otpRecieved, setotpRecieved] = useState(false);
    const [OTP, setOTP] = useState("");
    const [buttondata, setbuttondata] = useState("Get Verification mail");
    const [newpassword, setnewpassword] = useState("");
    const [redirect, setredirect] = useState(false);
   
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (!otpRecieved && !verified) {
                const { data } = await axios.post("/forgotpassword", { email });
                alert(data?.message);
                setbuttondata("Submit otp");
                setotpRecieved(true);
            } else if(verified) {
                submitHandler3(e);
            } else if (otpRecieved && !verified) {
                submitHandler2(e);
            }
        } catch (error) {
            alert(error?.response?.data?.message);
            setotpRecieved(false);
            setOTP("");
        }
    };

    const submitHandler2 = async (e) => {
        e.preventDefault();
         try {
            const { data } = await axios.post("/verifyforgototp", { email, OTP });
             alert(data.message);
             setemail("");
             setbuttondata("Change Password");
             setverified(true);
             setotpRecieved(false);
         } catch (error) {
            setverified(false);
            alert(error.response.data.message);
            setOTP("");
            setredirect(false);
            setotpRecieved(false);
            setbuttondata("Get Verification mail");
        }
    }

    const submitHandler3 = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/changepassword", { email, newpassword });
            alert(data?.message); 
            setverified(false);
            setredirect(true);
        } catch (error) {
            setverified(false);
            alert(error.response.data.message);
            setredirect(false);
        }
    }

    if (redirect) {
        return <Navigate to={"/"}/>
    }

  return (
    <div className='mt-10 grow flex items-center justify-around'>
    <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Password Reset</h1>
        <form className='max-w-md mx-auto' onSubmit={submitHandler}>
                <div>
                    <div>
                       <input type='email' placeholder='E-mail' required value={email} onChange={(e)=> setemail(e.target.value)}/>
                       {otpRecieved && (
                        <input type='password' placeholder='OTP' required value={OTP} onChange={(e)=> setOTP(e.target.value)}/>
                        )}
                        {verified && (
                        <input type='password' placeholder='New Password' required value={newpassword} onChange={(e)=> setnewpassword(e.target.value)}/>
                       )}      
                    </div>
                    <button className='primary' type='submit'>{buttondata}</button>
                </div>
        </form>
    </div>
</div>
  )
}

export default ForgotPassword
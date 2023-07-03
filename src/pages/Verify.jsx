import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Verify = () => {
    const [email, setemail] = useState("");
    const [redirect, setredirect] = useState(false);
    const [otpRecieved, setotpRecieved] = useState(false);
    const [OTP, setOTP] = useState("");
    const [buttondata, setbuttondata] = useState("Get Verification mail");

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (!otpRecieved) {
                const { data } = await axios.post("/verify", { email });
                alert(data?.message);
                setbuttondata("Submit otp");
                setotpRecieved(true);
            } else {
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
            const { data } = await axios.post("/verifyotp", { email, OTP });
            alert(data.message);
            setredirect(true);
        } catch (error) {
            alert(error.response.data.message);
            setOTP("");
            setredirect(false);
            setotpRecieved(false);
            setbuttondata("Get Verification mail");
        }
    }


    if(redirect){
        return <Navigate to={"/"}/>
    }

  return (
    <div className='mt-10 grow flex items-center justify-around'>
    <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Verify Your Profile</h1>
        <form className='max-w-md mx-auto' onSubmit={submitHandler}>
                <div>
                    <div>
                       <input type='email' placeholder='E-mail' required value={email} onChange={(e)=> setemail(e.target.value)}/>
                       {otpRecieved && (
                        <input type='password' placeholder={`Enter OTP recieved on ${email}`}  required value={OTP} onChange={(e)=> setOTP(e.target.value)}/>
                       )}
                    </div>
                    <button className='primary' type='submit'>{buttondata}</button>
                </div>
        </form>
    </div>
</div>
  )
}

export default Verify
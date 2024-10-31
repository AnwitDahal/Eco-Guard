import React, { useState } from 'react'
import Input from '../Components/Input'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/AppStore';

const SignUpIndie = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const navigate=useNavigate();

    
  const {signup}=useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try{
      await signup(email,password,name,mobile);
      navigate('/user')
    }
    catch(err){
        console.log(err);
        
      }
    };
    return (
        <div className='bg-bluish-radial-gradient from-[#087EB8] to-[#71BCE1]  min-h-screen flex justify-center items-center '>
            <div className='bg-[hsl(200,51%,85%)] bg-opacity-20 shadow-2xl flex-col  rounded-[1.875rem] py-8 px-5 flex gap-6 w-[35rem]'>
                <div className=''>
                    <h1 className='text-center font-semibold text-3xl text-white'>Sign Up For Individual!</h1>
                </div>
                <form className='flex  flex-col gap-6' onSubmit={handleSignUp}>
                    <Input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                    <Input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input type='password' placeholder='Password'  value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Input type='text' placeholder='Mobile Number' value={mobile}  onChange={(e) => setMobile(e.target.value)}/>
                    <Input type='text' placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
                    <button className='bg-[#342753E6] rounded-[1.875rem]  text-center text-white py-4 px-6'>Sign Up</button>
                </form>
                <p className=' text-center font-me'>Already have an account?  <span className='font-semibold cursor-pointer' 
                onClick={()=>navigate('/login')}>Log In</span></p>
            </div>
        </div>
      )
}

export default SignUpIndie
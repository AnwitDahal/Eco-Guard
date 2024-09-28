import { useNavigate } from "react-router-dom";
import Input from "../Components/Input";

const SignUpOrg = () => {
    const navigate=useNavigate();
    return (
        <div className='bg-bluish-radial-gradient from-[#087EB8] to-[#71BCE1]  min-h-screen flex justify-center items-center '>
            <div className='bg-[hsl(200,51%,85%)] bg-opacity-20 shadow-2xl flex-col  rounded-[1.875rem] py-8 px-5 flex gap-6 w-[35rem]'>
                <div className=''>
                    <h1 className='text-center font-semibold text-3xl text-white'>Sign Up For Organization  !</h1>
                </div>
                <form className='flex  flex-col gap-6'>
                    
                    <Input type='text' placeholder='Name'/>
                    <Input type='email' placeholder='Enter Email'/>
                    <Input type='password' placeholder='Password'/>
                    <Input type='text' placeholder='Mobile Number'/>
                    <Input type='text' placeholder='Address'/>
                    <button className='bg-[#342753E6] rounded-[1.875rem]  text-center text-white py-4 px-6'>Sign Up</button>
                </form>
                <p className=' text-center font-me'>Already have an account?  <span className='font-semibold cursor-pointer' 
                onClick={()=>navigate('/login')}>Log In</span></p>
            </div>
        </div>
      )
}


export default SignUpOrg;
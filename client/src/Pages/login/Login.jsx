import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate();
  
const handleLogin = async (e) => {
  e.preventDefault()
  
  if (!validateEmail(email)) {
    setError('Invalid email address')
    return;
  
}

if(!password){
  setError('Password is required')
  return;

}

setError('')


// Login API CALL

try{
const response =
await axiosInstance.post('/login', {
  email: email,
  password : password,
});

//handle succesful login response
if(response.data && response.data.accessToken){
  localStorage.setItem('token', response.data.accessToken)
 navigate('/');
}
}catch(error){
        //handle login
        
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message)
}else{
  setError('Something went wrong. Please try again ')
}

};
}

  return (
   <>
   <Navbar/>

   <div className='flex items-center justify-center mt-20'>
    <div className='w-96 border rounded bg-white px-7 py-10'>
    <form onSubmit={handleLogin}>
        <h2 className='text-lg mb-7'>Login</h2>

        <input 
        type="text"
         placeholder='Email'
         value={email}
         onChange={(e) =>setEmail(e.target.value)}
          className='input-box' />

       <PasswordInput 
       onChange={(e) => setPassword(e.target.value)}
       value={password
       }/>

        {error && <p className='text-red-500 text-xs'>{error}</p>}

        <button type='submit' className='btn-primary'>
            Login
        </button>
        <p className='text-center text-sm mt-4'>
            Not registered yet ? {" "}
          <Link to='/signUp' className="font-medium text-primary underline">
            Create an account
          </Link>
        </p>
    </form>
    </div>
   </div>
   </>
  )
}


export default Login
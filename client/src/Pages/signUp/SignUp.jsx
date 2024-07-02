import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useState } from 'react'
import PasswordInput from '../../components/input/PasswordInput'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'

const SignUp = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

const handleSignUp = async (e) => {
  e.preventDefault()
  
  if(!name){
    setError("Please enter your name ")
    return;
  }

  if(!validateEmail(email)){
    setError("Please enter a valid email address")
    return;
  }

  if(!password){
    setError("Please enter your password")
    return;
  }

  setError("")
};

  return (
  <>
     <Navbar/>

     <div className='flex items-center justify-center mt-20'>
    <div className='w-96 border rounded bg-white px-7 py-10'>
    <form onSubmit={handleSignUp}>
        <h2 className='text-lg mb-7'>Signup</h2>
        
        <input 
        type="text" 
        placeholder='Name'
        className='input-box'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <input 
        type="email" 
        placeholder='Email'
        className='input-box'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

      <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

      {error && <p className='text-red-500 text-xs'>{error}</p>}

        <button type='submit' className='btn-primary'>
            SignUp
        </button>
        <p className='text-center text-sm mt-4'>
           Already have an account? {" "}
          <Link to='/login' className="font-medium text-primary underline">
          Login
          </Link>
        </p>

    </form>
    </div>    
    </div>

  </>
  )
}

export default SignUp